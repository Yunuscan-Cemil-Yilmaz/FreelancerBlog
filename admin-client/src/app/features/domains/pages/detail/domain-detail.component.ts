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
  templateUrl: './domain-detail.component.html',
  styleUrl: './domain-detail.component.css'
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
