import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryService } from '../../services/categories.service';
import { Category } from '../../domain/categories';

@Component({
  selector: 'app-categories-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSnackBarModule
  ],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Edit' : 'Add' }} Category</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="form-container">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>name_en</mat-label>
          <input matInput formControlName="name_en">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>name_tr</mat-label>
          <input matInput formControlName="name_tr">
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>slug</mat-label>
          <input matInput formControlName="slug">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid || loading" (click)="save()">
        {{ loading ? 'Saving...' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .form-container { display: flex; flex-direction: column; padding-top: 10px; }
    .full-width { width: 100%; }
  `]
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category | null,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name_en: ['', [Validators.required]],
      name_tr: ['', [Validators.required]],
      slug: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      let patchData = { ...this.data };
      // Handle special JSON array for items if it exists
      if ((this.data as any)['items'] && typeof (this.data as any)['items'] !== 'string') {
        (patchData as any)['items'] = JSON.stringify((this.data as any)['items'], null, 2);
      }
      this.form.patchValue(patchData);
    }
  }

  save() {
    if (this.form.valid) {
      this.loading = true;
      const payload = { ...this.form.value };
      
      // Handle JSON parsing for items if it exists
      if (payload.items) {
        try {
          payload.items = JSON.parse(payload.items);
        } catch(e) {
          this.snackBar.open('Invalid JSON in items', 'Close', {duration: 3000});
          this.loading = false;
          return;
        }
      }

      if (this.isEdit && this.data) {
        payload.id = this.data.id;
        this.service.update(payload).subscribe({
          next: () => {
            this.snackBar.open('Updated successfully', 'Close', {duration: 3000});
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.snackBar.open(err.error?.message || 'Error updating', 'Close', {duration: 3000});
            this.loading = false;
          }
        });
      } else {
        this.service.create(payload).subscribe({
          next: () => {
            this.snackBar.open('Created successfully', 'Close', {duration: 3000});
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.snackBar.open(err.error?.message || 'Error creating', 'Close', {duration: 3000});
            this.loading = false;
          }
        });
      }
    }
  }
}
