import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ModeratorService, Moderator } from '../../domain/moderator';
import { DomainService, Domain } from '@features/domains/domain/domain';

@Component({
  selector: 'app-moderator-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './moderator-dialog.component.html',
  styleUrl: './moderator-dialog.component.css'
})
export class ModeratorDialogComponent implements OnInit {
  form: FormGroup;
  domains: Domain[] = [];
  isSubmitting = false;
  title = '';
  submitLabel = '';

  constructor(
    private fb: FormBuilder,
    private moderatorService: ModeratorService,
    private domainService: DomainService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModeratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'create' | 'update' | 'reset-password', moderator?: Moderator, domain_id?: number }
  ) {
    this.form = this.fb.group({});
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data.mode === 'create' || this.data.mode === 'update') {
      this.loadDomains();
    }
  }

  private initForm(): void {
    if (this.data.mode === 'create') {
      this.title = 'Create New Moderator';
      this.submitLabel = 'Create';
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        full_name: ['', Validators.required],
        domain_id: [{ value: this.data.domain_id || null, disabled: !!this.data.domain_id }, Validators.required]
      });
    } else if (this.data.mode === 'update') {
      this.title = `Update Domain: ${this.data.moderator?.username}`;
      this.submitLabel = 'Update';
      this.form = this.fb.group({
        domain_id: [this.data.moderator?.domain_id, Validators.required]
      });
    } else if (this.data.mode === 'reset-password') {
      this.title = `Reset Password: ${this.data.moderator?.username}`;
      this.submitLabel = 'Reset';
      this.form = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  }

  loadDomains(): void {
    // Pagination might be needed but let's load first page for now
    this.domainService.getDomains(1, 50).subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.domains = response.data.data;
        }
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isSubmitting = true;
    const value = this.form.getRawValue();

    let obs;
    if (this.data.mode === 'create') {
      obs = this.moderatorService.createModerator(value);
    } else if (this.data.mode === 'update') {
      obs = this.moderatorService.updateModeratorDomain(this.data.moderator!.id, value.domain_id);
    } else if (this.data.mode === 'reset-password') {
      obs = this.moderatorService.resetPassword(this.data.moderator!.id, value.password);
    }

    obs?.subscribe({
      next: () => {
        this.snackBar.open('Success!', 'Close', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.showError(err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private showError(err: any): void {
    let message = 'An error occurred';
    if (err.error && err.error.message) {
      message = err.error.message;
    } else if (err.status === 422) {
      message = 'Validation error: ' + (err.error.errors ? Object.values(err.error.errors).flat().join(', ') : '');
    }
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }
}
