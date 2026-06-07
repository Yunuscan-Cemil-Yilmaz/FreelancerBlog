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
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.css'
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
