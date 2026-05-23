import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BlogService } from '../../services/blogs.service';
import { Blog } from '../../domain/blogs';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-blogs-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule, RouterModule],
  template: `
    <div class="header-container">
      <h2>Blog Management</h2>
      <button mat-raised-button color="primary" routerLink="/dashboard/blogs/create">
        <mat-icon>add</mat-icon> Add New Blog
      </button>
    </div>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let element">
           <a [routerLink]="['/dashboard/blogs/edit', element.id]" class="id-link">{{ element.id }}</a>
        </td>
      </ng-container>

      <ng-container matColumnDef="title_en">
        <th mat-header-cell *matHeaderCellDef> Title (EN) </th>
        <td mat-cell *matCellDef="let element"> {{ element.title_en }} </td>
      </ng-container>
      
      <ng-container matColumnDef="title_tr">
        <th mat-header-cell *matHeaderCellDef> Title (TR) </th>
        <td mat-cell *matCellDef="let element"> {{ element.title_tr }} </td>
      </ng-container>

      <ng-container matColumnDef="category">
        <th mat-header-cell *matHeaderCellDef> Category (ID / Name) </th>
        <td mat-cell *matCellDef="let element"> 
          {{ element.category_id }} / {{ element.category?.name_en || '-' }} 
        </td>
      </ng-container>

      <ng-container matColumnDef="sub_category">
        <th mat-header-cell *matHeaderCellDef> Sub Category (ID / Name) </th>
        <td mat-cell *matCellDef="let element"> 
          {{ element.sub_category_id || '-' }} / {{ element.sub_category?.name_en || '-' }} 
        </td>
      </ng-container>

      <ng-container matColumnDef="author">
        <th mat-header-cell *matHeaderCellDef> Author </th>
        <td mat-cell *matCellDef="let element"> {{ element.author }} </td>
      </ng-container>

      <ng-container matColumnDef="created_at">
        <th mat-header-cell *matHeaderCellDef> Created At </th>
        <td mat-cell *matCellDef="let element"> {{ element.created_at | date }} </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Actions </th>
        <td mat-cell *matCellDef="let element">
          <button mat-icon-button color="primary" [routerLink]="['/dashboard/blogs/edit', element.id]">
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
export class BlogsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title_en', 'category', 'sub_category', 'author', 'created_at', 'actions'];
  dataSource: Blog[] = [];
  
  totalItems = 0;
  pageSize = 10;
  currentPage = 1;

  constructor(
    private service: BlogService,
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
      error: (err) => this.snackBar.open('Error loading blogs', 'Close', { duration: 3000 })
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Blog deleted successfully', 'Close', { duration: 3000 });
          this.loadData();
        },
        error: (err) => this.snackBar.open(err.error?.message || 'Error deleting', 'Close', { duration: 3000 })
      });
    }
  }
}
