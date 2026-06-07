import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { DomainService, Domain } from '../../domain/domain';

@Component({
  selector: 'app-domain-update-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './domain-update-dialog.html',
  styleUrl: './domain-update-dialog.css'
})
export class DomainUpdateDialogComponent {
  updateType: 'normal' | 'cascade' = 'normal';

  constructor(
    public dialogRef: MatDialogRef<DomainUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Domain,
    private domainService: DomainService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const updateData = {
      id: this.data.id,
      domain: this.data.domain,
      admin_domain: this.data.admin_domain
    };

    if (this.updateType === 'cascade') {
      this.domainService.cascadeUpdateDomain(updateData).subscribe({
        next: () => {
          this.snackBar.open('Domain updated everywhere successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Cascade update failed', err);
          const message = this.extractErrorMessage(err);
          this.snackBar.open(message, 'Close', { duration: 5000 });
        }
      });
    } else {
      this.domainService.updateDomain(updateData).subscribe({
        next: () => {
          this.snackBar.open('Domain updated successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Normal update failed', err);
          const message = this.extractErrorMessage(err);
          this.snackBar.open(message, 'Close', { duration: 5000 });
        }
      });
    }
  }

  private extractErrorMessage(err: any): string {
    if (err.error && err.error.errors) {
      return Object.values(err.error.errors).flat().join(' ');
    }
    return err.error?.message || err.message || 'An unexpected error occurred';
  }
}
