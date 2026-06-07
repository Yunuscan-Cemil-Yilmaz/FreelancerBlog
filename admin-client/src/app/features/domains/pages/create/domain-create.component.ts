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
import { DomainService } from '../../domain/domain';

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
  templateUrl: './domain-create.component.html',
  styleUrl: './domain-create.component.css'
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
      error: (err: any) => {
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
