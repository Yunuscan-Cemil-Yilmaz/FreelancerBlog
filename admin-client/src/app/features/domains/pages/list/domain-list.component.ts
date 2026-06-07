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
  templateUrl: './domain-list.component.html',
  styleUrl: './domain-list.component.css'
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
