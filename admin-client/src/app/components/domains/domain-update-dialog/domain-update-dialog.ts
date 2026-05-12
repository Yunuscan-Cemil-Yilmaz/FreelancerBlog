import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { DomainService, Domain } from '../../../services/domain/domain';

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
  template: `
    <h2 mat-dialog-title>Update Domain</h2>
    <mat-dialog-content>
      <div class="form-container">
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Domain</mat-label>
          <input matInput [(ngModel)]="data.domain" required>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Admin Domain</mat-label>
          <input matInput [(ngModel)]="data.admin_domain" required>
        </mat-form-field>

        <div class="update-type-section">
          <label id="update-type-label">Update Type:</label>
          <mat-radio-group
            aria-labelledby="update-type-label"
            class="update-radio-group"
            [(ngModel)]="updateType">
            <mat-radio-button value="normal" color="primary">
              Normal Update (Only Domain Table)
            </mat-radio-button>
            <mat-radio-button value="cascade" color="primary">
              Cascade Update (Update everywhere)
            </mat-radio-button>
          </mat-radio-group>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!data.domain || !data.admin_domain">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding-top: 10px;
    }
    .full-width {
      width: 100%;
    }
    .update-type-section {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
    }
    .update-radio-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
    }
  `]
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
