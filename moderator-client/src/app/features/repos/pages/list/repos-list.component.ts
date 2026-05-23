import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RepoService } from '../../services/repos.service';
import { Repo } from '../../domain/repos';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-repos-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule, RouterModule],
  template: `
    <div class="header-container">
      <h2>Repo Management</h2>
      <button mat-raised-button color="primary" routerLink="/dashboard/repos/create">
        <mat-icon>add</mat-icon> Add New Repo
      </button>
    </div>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let element">
           <a [routerLink]="['/dashboard/repos/edit', element.id]" class="id-link">{{ element.id }}</a>
        </td>
      </ng-container>

      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef> Title </th>
        <td mat-cell *matCellDef="let element"> {{ element.title }} </td>
      </ng-container>

      <ng-container matColumnDef="is_public">
        <th mat-header-cell *matHeaderCellDef> Public </th>
        <td mat-cell *matCellDef="let element"> 
          <mat-icon [color]="element.is_public ? 'primary' : 'warn'">
            {{ element.is_public ? 'check_circle' : 'cancel' }}
          </mat-icon>
        </td>
      </ng-container>

      <ng-container matColumnDef="view_count">
        <th mat-header-cell *matHeaderCellDef> Views </th>
        <td mat-cell *matCellDef="let element"> {{ element.view_count }} </td>
      </ng-container>

      <ng-container matColumnDef="created_at">
        <th mat-header-cell *matHeaderCellDef> Created At </th>
        <td mat-cell *matCellDef="let element"> {{ element.created_at | date }} </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let element">
          <button mat-icon-button color="primary" [routerLink]="['/dashboard/repos/edit', element.id]">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="delete(element.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <mat-paginator [length]="totalItems"
                   [pageSize]="pageSize"
                   [pageSizeOptions]="[5, 10, 25, 100]"
                   (page)="onPageChange($event)"
                   aria-label="Select page">
    </mat-paginator>
  `,
  styles: [`
    .header-container { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    table { width: 100%; }
    .id-link { color: #3f51b5; font-weight: 500; text-decoration: underline; cursor: pointer; }
  `]
})
export class ReposListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'is_public', 'view_count', 'created_at', 'actions'];
  dataSource: Repo[] = [];
  
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;

  constructor(
    private service: RepoService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getAll(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.dataSource = res.data;
        this.totalItems = res.total;
        this.cdr.detectChanges();
      },
      error: (err) => this.snackBar.open('Error loading repos', 'Close', { duration: 3000 })
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this repo?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Repo deleted successfully', 'Close', { duration: 3000 });
          this.loadData();
        },
        error: (err) => this.snackBar.open(err.error?.message || 'Error deleting', 'Close', { duration: 3000 })
      });
    }
  }
}
