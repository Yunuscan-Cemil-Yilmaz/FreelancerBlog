import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ModeratorService, Moderator } from '../../../services/moderator/moderator';

@Component({
  selector: 'app-moderator-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="detail-container">
      <div class="header">
        <button mat-icon-button routerLink="/dashboard/moderators">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Moderator Details</h1>
      </div>

      <div *ngIf="isLoading" class="spinner-container">
        <mat-spinner diameter="50"></mat-spinner>
      </div>

      <div *ngIf="!isLoading && moderator" class="content-wrapper">
        <mat-card class="detail-card main-info">
          <mat-card-header>
            <div mat-card-avatar class="moderator-avatar">
              <mat-icon>person</mat-icon>
            </div>
            <mat-card-title>{{ moderator.full_name }}</mat-card-title>
            <mat-card-subtitle>@{{ moderator.username }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Status</span>
                <span class="value">
                  <span class="status-badge" [class.active]="moderator.is_active">
                    {{ moderator.is_active ? 'Active Account' : 'Suspended' }}
                  </span>
                </span>
              </div>
              <div class="info-item">
                <span class="label">Assigned Domain</span>
                <span class="value">{{ moderator.domain?.domain || 'None' }}</span>
              </div>
              <div class="info-item">
                <span class="label">Account ID</span>
                <span class="value">{{ moderator.id }}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="detail-card">
          <mat-card-header>
            <mat-card-title>Permissions & Role</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>This moderator has management access to the <strong>{{ moderator.domain?.domain }}</strong> domain.</p>
            <ul class="permission-list">
              <li>Manage Blog Posts</li>
              <li>Manage Categories</li>
              <li>Manage Projects/Repos</li>
              <li>View Statistics</li>
            </ul>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="!isLoading && !moderator" class="error-state">
        <mat-icon color="warn">error</mat-icon>
        <p>{{ errorMessage || 'Moderator not found.' }}</p>
        <button mat-raised-button color="primary" routerLink="/dashboard/moderators">Go Back</button>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }
    .header h1 {
      margin: 0;
      font-weight: 600;
      color: #2c3e50;
    }
    .content-wrapper {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .detail-card {
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .moderator-avatar {
      background-color: #764ba2;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin: 24px 0;
    }
    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .label {
      font-size: 11px;
      color: #7f8c8d;
      text-transform: uppercase;
      font-weight: 600;
    }
    .value {
      font-size: 16px;
      font-weight: 500;
      color: #34495e;
    }
    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      background-color: #ecf0f1;
      color: #95a5a6;
    }
    .status-badge.active {
      background-color: #d4edda;
      color: #155724;
    }
    .permission-list {
      margin-top: 16px;
      color: #34495e;
    }
    .permission-list li {
      margin-bottom: 8px;
    }
    .spinner-container {
      display: flex;
      justify-content: center;
      margin-top: 100px;
    }
    .error-state {
      text-align: center;
      margin-top: 100px;
    }
  `]
})
export class ModeratorDetailComponent implements OnInit {
  moderator: Moderator | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetails(+id);
    }
  }

  loadDetails(id: number): void {
    this.isLoading = true;
    this.cdr.detectChanges();

    this.moderatorService.getModeratorDetails(id).subscribe({
      next: (response) => {
        this.moderator = response.data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Moderator details could not be loaded.';
        this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
        this.cdr.detectChanges();
      }
    });
  }
}
