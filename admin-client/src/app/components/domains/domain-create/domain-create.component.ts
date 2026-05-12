import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomainService } from '../../../services/domain/domain';

@Component({
  selector: 'app-domain-create',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule
  ],
  template: `
    <div class="create-container">
      <mat-card class="form-card">
        <mat-card-header>
          <div mat-card-avatar><mat-icon class="header-icon">add_circle</mat-icon></div>
          <mat-card-title>Create New Domain</mat-card-title>
          <mat-card-subtitle>Add a new domain to the system</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form class="create-form" (ngSubmit)="onSubmit()" #domainForm="ngForm">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Domain Name</mat-label>
              <input matInput placeholder="e.g., example.com" [(ngModel)]="domain" name="domain" required>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Admin Domain Name</mat-label>
              <input matInput placeholder="e.g., admin.example.com" [(ngModel)]="admin_domain" name="admin_domain" required>
            </mat-form-field>
            
            <div class="actions">
              <button mat-button type="button" (click)="cancel()">Cancel</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="!domainForm.form.valid || isSubmitting">
                {{ isSubmitting ? 'Creating...' : 'Create Domain' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .create-container {
      padding: 20px;
      display: flex;
      justify-content: center;
    }
    .form-card {
      width: 100%;
      max-width: 600px;
      padding: 20px;
    }
    .header-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: #764ba2;
    }
    .create-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;
    }
    .full-width {
      width: 100%;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }
  `]
})
export class DomainCreateComponent {
  domain: string = '';
  admin_domain: string = '';
  isSubmitting = false;

  constructor(
    private domainService: DomainService, 
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {
    if (!this.domain || !this.admin_domain) return;
    
    this.isSubmitting = true;
    this.domainService.createDomain({
      domain: this.domain,
      admin_domain: this.admin_domain
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
        this.snackBar.open('Domain created successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard/domains']);
      },
      error: (err) => {
        console.error('Failed to create domain', err);
        this.isSubmitting = false;
        this.cdr.detectChanges();
        
        const message = this.extractErrorMessage(err);
        this.snackBar.open(message, 'Close', { duration: 5000 });
      },
      complete: () => {
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  private extractErrorMessage(err: any): string {
    if (err.error && err.error.errors) {
      // Laravel validation errors are usually in an object: { field: [messages] }
      return Object.values(err.error.errors).flat().join(' ');
    }
    return err.error?.message || err.message || 'Failed to process request';
  }

  cancel() {
    this.router.navigate(['/dashboard/domains']);
  }
}
