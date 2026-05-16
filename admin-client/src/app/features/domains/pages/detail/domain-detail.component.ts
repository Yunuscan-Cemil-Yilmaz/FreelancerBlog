import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DomainService, Domain } from '../../domain/domain';
import { ModeratorService, Moderator } from '@features/moderators/domain/moderator';
import { ModeratorDialogComponent } from '@features/moderators/components/dialog/moderator-dialog.component';

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
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule
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
            <span class="spacer"></span>
            <button mat-raised-button color="primary" (click)="openAddModeratorDialog()">
              <mat-icon>add</mat-icon> Add Moderator
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container">
              <div class="loading-shade" *ngIf="isModeratorsLoading">
                <mat-spinner diameter="30"></mat-spinner>
              </div>

              <table mat-table [dataSource]="moderators" class="full-width-table">
                <ng-container matColumnDef="id">
                  <th mat-header-cell *matHeaderCellDef> ID </th>
                  <td mat-cell *matCellDef="let mod"> 
                    <a [routerLink]="['/dashboard/moderators', mod.id]" class="detail-link">
                      {{ mod.id }}
                    </a>
                  </td>
                </ng-container>

                <ng-container matColumnDef="username">
                  <th mat-header-cell *matHeaderCellDef> Username </th>
                  <td mat-cell *matCellDef="let mod"> {{ mod.username }} </td>
                </ng-container>

                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef> Status </th>
                  <td mat-cell *matCellDef="let mod">
                    <mat-slide-toggle 
                      [checked]="mod.is_active" 
                      (change)="toggleModeratorStatus(mod, $event.checked)">
                    </mat-slide-toggle>
                  </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef> Actions </th>
                  <td mat-cell *matCellDef="let mod">
                    <button mat-icon-button color="primary" (click)="openUpdateDomainDialog(mod)" title="Update Domain">
                      <mat-icon>domain</mat-icon>
                    </button>
                    <button mat-icon-button color="accent" (click)="resetModeratorPassword(mod)" title="Reset Password">
                      <mat-icon>lock_reset</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="deleteModerator(mod.id)" title="Delete">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>

              <div class="no-moderators" *ngIf="!isModeratorsLoading && moderators.length === 0">
                No moderators assigned to this domain.
              </div>
            </div>

            <mat-paginator 
              [length]="totalModerators"
              [pageSize]="moderatorPageSize"
              [pageSizeOptions]="[5, 10, 20]"
              (page)="onModeratorPageChange($event)">
            </mat-paginator>
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
    .spacer {
      flex: 1 1 auto;
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
    .table-container {
      position: relative;
      min-height: 150px;
      margin-top: 16px;
    }
    .full-width-table {
      width: 100%;
    }
    .loading-shade {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.7);
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .detail-link {
      color: #3f51b5;
      text-decoration: none;
      font-weight: 600;
    }
    .detail-link:hover {
      text-decoration: underline;
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

  // Moderators Pagination
  moderators: Moderator[] = [];
  isModeratorsLoading = false;
  totalModerators = 0;
  moderatorPageSize = 5;
  moderatorPageIndex = 1;
  displayedColumns: string[] = ['id', 'username', 'status', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private domainService: DomainService,
    private moderatorService: ModeratorService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
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
        // After loading domain details, load paginated moderators
        this.loadPaginatedModerators();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error loading domain details', err);
        this.isLoading = false;
        this.errorMessage = this.extractErrorMessage(err);
        this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
        this.cdr.detectChanges();
      }
    });
  }

  loadPaginatedModerators(): void {
    if (!this.details || !this.details.data) return;

    this.isModeratorsLoading = true;
    this.cdr.detectChanges();

    const domainName = this.details.data.domain;
    this.moderatorService.getModerators(this.moderatorPageIndex, this.moderatorPageSize, domainName).subscribe({
      next: (response: any) => {
        if (response && response.data) {
          this.moderators = response.data.data;
          this.totalModerators = response.data.total;
        }
        this.isModeratorsLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error loading moderators', err);
        this.isModeratorsLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onModeratorPageChange(event: PageEvent): void {
    this.moderatorPageIndex = event.pageIndex + 1;
    this.moderatorPageSize = event.pageSize;
    this.loadPaginatedModerators();
  }

  openAddModeratorDialog(): void {
    if (!this.details || !this.details.data) return;

    const dialogRef = this.dialog.open(ModeratorDialogComponent, {
      width: '500px',
      data: { mode: 'create', domain_id: this.details.data.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPaginatedModerators();
      }
    });
  }

  openUpdateDomainDialog(mod: Moderator): void {
    const dialogRef = this.dialog.open(ModeratorDialogComponent, {
      width: '500px',
      data: { mode: 'update', moderator: mod }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPaginatedModerators();
      }
    });
  }

  toggleModeratorStatus(mod: Moderator, isActive: boolean): void {
    this.moderatorService.setActiveStatus(mod.id, isActive).subscribe({
      next: () => {
        setTimeout(() => {
          mod.is_active = isActive;
          this.cdr.detectChanges();
        });
        this.snackBar.open('Status updated', 'Close', { duration: 2000 });
      },
      error: (err: any) => {
        this.snackBar.open('Failed to update status', 'Close', { duration: 2000 });
        this.loadPaginatedModerators();
      }
    });
  }

  resetModeratorPassword(mod: Moderator): void {
    const dialogRef = this.dialog.open(ModeratorDialogComponent, {
      width: '500px',
      data: { mode: 'reset-password', moderator: mod }
    });
  }

  deleteModerator(id: number): void {
    if (confirm('Delete this moderator?')) {
      this.moderatorService.deleteModerator(id).subscribe({
        next: () => {
          this.snackBar.open('Moderator deleted', 'Close', { duration: 2000 });
          this.loadPaginatedModerators();
        },
        error: (err: any) => this.snackBar.open('Failed to delete', 'Close', { duration: 2000 })
      });
    }
  }

  private extractErrorMessage(err: any): string {
    if (err.status === 404) return 'Domain not found.';
    if (err.status === 401 || err.status === 403) return 'Unauthorized.';
    if (err.status >= 500) return 'Server error.';
    if (err.status === 0) return 'Connection error.';
    return 'An error occurred.';
  }
}
