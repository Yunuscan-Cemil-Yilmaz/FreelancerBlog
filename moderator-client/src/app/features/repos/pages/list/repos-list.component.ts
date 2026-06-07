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
  templateUrl: './repos-list.component.html',
  styleUrl: './repos-list.component.css'
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
