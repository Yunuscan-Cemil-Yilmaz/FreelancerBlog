import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SubCategoryService } from '../../services/sub-categories.service';
import { SubCategory } from '../../domain/sub-categories';
import { SubCategoryFormComponent } from '../../components/sub-categories-form/sub-categories-form.component';


@Component({
  selector: 'app-sub-categories-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './sub-categories-list.component.html',
  styleUrl: './sub-categories-list.component.css'
})
export class SubCategoryListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'category_id', 'name_en', 'name_tr', 'slug', 'actions'];
  dataSource: SubCategory[] = [];

  constructor(
    private service: SubCategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe({
      next: (res) => { this.dataSource = res.data; this.cdr.detectChanges(); },
      error: (err) => this.snackBar.open('Error loading data', 'Close', { duration: 3000 })
    });
  }

  openDialog(element?: SubCategory) {
    const dialogRef = this.dialog.open(SubCategoryFormComponent, {
      width: '600px',
      data: element || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Deleted successfully', 'Close', { duration: 3000 });
          this.loadData();
        },
        error: (err) => this.snackBar.open(err.error?.message || 'Error deleting', 'Close', { duration: 3000 })
      });
    }
  }
}
