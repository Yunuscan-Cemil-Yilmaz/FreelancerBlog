import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { DomainService, Domain } from '../../domain/domain';
import { DomainUpdateDialogComponent } from '../../components/update-dialog/domain-update-dialog';

@Component({
  selector: 'app-domain-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  template: `
    <div class="list-container mat-elevation-z8">
      <div class="header-row">
        <h2>Domains</h2>
        <button mat-icon-button (click)="loadDomains()" [disabled]="isLoading" title="Refresh">
          <mat-icon [class.spinning]="isLoading">refresh</mat-icon>
        </button>
      </div>
      
      <div class="loading-shade" *ngIf="isLoading">
        <mat-spinner diameter="50"></mat-spinner>
      </div>

      <div class="table-container">
        <table mat-table [dataSource]="domains" class="full-width-table" *ngIf="domains.length > 0">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> ID </th>
            <td mat-cell *matCellDef="let element">
              <a [routerLink]="['/dashboard/domains', element.id]" class="detail-link">
                {{element.id}}
              </a>
            </td>
          </ng-container>

          <ng-container matColumnDef="domain">
            <th mat-header-cell *matHeaderCellDef> Domain </th>
            <td mat-cell *matCellDef="let element"> {{element.domain}} </td>
          </ng-container>

          <ng-container matColumnDef="admin_domain">
            <th mat-header-cell *matHeaderCellDef> Admin Domain </th>
            <td mat-cell *matCellDef="let element"> {{element.admin_domain}} </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let element">
              <button mat-icon-button color="primary" (click)="openUpdateDialog(element)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteDomain(element.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <div class="no-data" *ngIf="!isLoading && domains.length === 0">
          <mat-icon>info</mat-icon>
          <p>No domains found. Try refreshing or creating one.</p>
        </div>
      </div>

      <mat-paginator 
        [length]="totalElements"
        [pageSize]="pageSize"
        [pageSizeOptions]="[5, 10, 25, 100]"
        (page)="onPageChange($event)"
        aria-label="Select page">
      </mat-paginator>
    </div>
  `,
  styles: [`
    .list-container {
      margin: 20px;
      padding: 20px;
      background: white;
      border-radius: 8px;
    }
    h2 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #333;
    }
    .full-width-table {
      width: 100%;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .loading-shade {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    .table-container {
      position: relative;
      min-height: 200px;
    }
    .no-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #666;
    }
    .no-data mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 10px;
    }
    .spinning {
      animation: rotate 2s linear infinite;
    }
    .detail-link {
      color: #3f51b5;
      text-decoration: none;
      font-weight: 500;
    }
    .detail-link:hover {
      text-decoration: underline;
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `]
})
export class DomainListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'domain', 'admin_domain', 'actions'];
  domains: Domain[] = [];
  isLoading = false;
  
  totalElements = 0;
  pageSize = 10;
  pageIndex = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private domainService: DomainService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('DomainListComponent: ngOnInit');
    this.loadDomains();
  }

  loadDomains(): void {
    console.log('DomainListComponent: loadDomains called');
    this.isLoading = true;
    this.cdr.detectChanges();
    
    this.domainService.getDomains(this.pageIndex, this.pageSize).subscribe({
      next: (response: any) => {
        console.log('DomainListComponent: Received response', response);
        this.isLoading = false;
        
        let dataArray: Domain[] = [];
        let totalCount = 0;

        if (response && response.data && Array.isArray(response.data.data)) {
          dataArray = response.data.data;
          totalCount = response.data.total;
        } else if (response && Array.isArray(response.data)) {
          dataArray = response.data;
          totalCount = response.total || response.data.length;
        } else if (Array.isArray(response)) {
          dataArray = response;
          totalCount = response.length;
        }

        this.domains = dataArray;
        this.totalElements = totalCount;
        this.cdr.detectChanges();
        
        if (this.domains.length > 0) {
          this.snackBar.open(`Loaded ${this.domains.length} domains`, 'Close', { duration: 2000 });
        }
      },
      error: (err: any) => {
        console.error('DomainListComponent: Load error', err);
        this.isLoading = false;
        this.cdr.detectChanges();
        const errorMsg = this.extractErrorMessage(err);
        this.snackBar.open(errorMsg, 'Close', { duration: 5000 });
      },
      complete: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
        console.log('DomainListComponent: Request completed');
      }
    });
  }

  private extractErrorMessage(err: any): string {
    if (err.error && err.error.errors) {
      return Object.values(err.error.errors).flat().join(' ');
    }
    // Handle the specific 'No domains found' case to be less 'scary'
    if (err.status === 404 && err.error?.message?.includes('No domains found')) {
      return 'No domains records found in the database.';
    }
    return err.error?.message || err.message || 'An unexpected error occurred';
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex + 1; // Backend is 1-indexed probably
    this.pageSize = event.pageSize;
    this.loadDomains();
  }

  openUpdateDialog(domain: Domain): void {
    const dialogRef = this.dialog.open(DomainUpdateDialogComponent, {
      width: '400px',
      data: { ...domain }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDomains(); // Reload after update
      }
    });
  }

  deleteDomain(id: number): void {
    if (confirm('Are you sure you want to delete this domain? (Placeholder)')) {
      this.domainService.deleteDomain(id).subscribe({
        next: () => {
          this.loadDomains();
        },
        error: (err: any) => {
          console.error('Failed to delete domain', err);
          // Reload anyway since it's a placeholder
          this.loadDomains();
        }
      });
    }
  }
}
