import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { DomainService, Domain } from '../../../services/domain/domain';

@Component({
  selector: 'app-domain-detail',
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
        <button mat-icon-button routerLink="/dashboard/domains">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h1>Domain Details</h1>
      </div>

      <div *ngIf="isLoading" class="spinner-container">
        <mat-spinner diameter="50"></mat-spinner>
      </div>

      <div *ngIf="!isLoading && details" class="content-wrapper">
        <mat-card class="detail-card main-info">
          <mat-card-header>
            <div mat-card-avatar class="domain-avatar">
              <mat-icon>language</mat-icon>
            </div>
            <mat-card-title>{{ details.data.domain }}</mat-card-title>
            <mat-card-subtitle>ID: {{ details.data.id }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Public Domain</span>
                <span class="value">{{ details.data.domain }}</span>
              </div>
              <div class="info-item">
                <span class="label">Admin Domain</span>
                <span class="value">{{ details.data.admin_domain }}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <div class="stats-grid">
          <mat-card class="stat-card" *ngFor="let stat of statsArray">
            <mat-card-content>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </mat-card-content>
          </mat-card>
        </div>

        <mat-card class="detail-card">
          <mat-card-header>
            <mat-card-title>Moderators</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div *ngIf="details.moderators.length === 0" class="no-moderators">
              No moderators assigned to this domain.
            </div>
            <table *ngIf="details.moderators.length > 0" class="moderators-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let mod of details.moderators">
                  <td>{{ mod.username }}</td>
                  <td>
                    <span class="status-badge" [class.active]="mod.is_active">
                      {{ mod.is_active ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="!isLoading && !details" class="error-state">
        <mat-icon color="warn">error</mat-icon>
        <p>{{ errorMessage || 'Domain not found or an error occurred.' }}</p>
        <button mat-raised-button color="primary" routerLink="/dashboard/domains">Go Back</button>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      padding: 24px;
      max-width: 1000px;
      margin: 0 auto;
      background-color: #f8f9fa;
      min-height: 100vh;
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
      border: none;
    }
    .main-info {
      background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
    }
    .domain-avatar {
      background-color: #3f51b5;
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
      margin: 16px 0;
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
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 16px;
    }
    .stat-card {
      text-align: center;
      transition: transform 0.2s;
    }
    .stat-card:hover {
      transform: translateY(-4px);
    }
    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #3f51b5;
    }
    .stat-label {
      font-size: 12px;
      color: #7f8c8d;
      text-transform: capitalize;
    }
    .moderators-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    .moderators-table th {
      text-align: left;
      padding: 12px;
      border-bottom: 2px solid #ecf0f1;
      color: #7f8c8d;
      font-size: 13px;
    }
    .moderators-table td {
      padding: 12px;
      border-bottom: 1px solid #ecf0f1;
      color: #2c3e50;
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
    .spinner-container {
      display: flex;
      justify-content: center;
      margin-top: 100px;
    }
    .error-state {
      text-align: center;
      margin-top: 100px;
    }
    .error-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
    }
    .no-moderators {
      padding: 24px;
      text-align: center;
      color: #7f8c8d;
      font-style: italic;
    }
  `]
})
export class DomainDetailComponent implements OnInit {
  details: any = null;
  isLoading = true;
  errorMessage = '';
  statsArray: { label: string, value: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private domainService: DomainService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDomainDetails(+id);
    } else {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  loadDomainDetails(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.detectChanges();

    this.domainService.getDomainDetails(id).subscribe({
      next: (response) => {
        this.details = response;
        if (this.details && this.details.counts) {
          this.statsArray = Object.keys(this.details.counts).map(key => ({
            label: key.replace('_', ' '),
            value: this.details.counts[key]
          }));
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading domain details', err);
        this.isLoading = false;
        this.errorMessage = this.extractErrorMessage(err);
        this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
        this.cdr.detectChanges();
      }
    });
  }

  private extractErrorMessage(err: any): string {
    // Check for specific HTTP status codes first for better user experience
    if (err.status === 404) {
      return 'The requested domain record could not be found.';
    }
    
    if (err.status === 401 || err.status === 403) {
      return 'You do not have permission to view these details.';
    }

    if (err.status >= 500) {
      return 'A server-side error occurred. Our team has been notified.';
    }

    if (err.status === 0) {
      return 'Connection lost. Please check your internet or server status.';
    }

    // Default friendly message if no specific mapping exists
    return 'An unexpected error occurred while loading domain details. Please try again.';
  }
}
