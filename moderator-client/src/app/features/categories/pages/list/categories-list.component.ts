import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { forkJoin } from 'rxjs';

import { CategoryService } from '../../services/categories.service';
import { Category } from '../../domain/categories';
import { CategoryFormComponent } from '../../components/categories-form/categories-form.component';

import { SubCategoryService } from '../../../sub-categories/services/sub-categories.service';
import { SubCategory } from '../../../sub-categories/domain/sub-categories';
import { SubCategoryFormComponent } from '../../../sub-categories/components/sub-categories-form/sub-categories-form.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule, 
    MatSnackBarModule,
    MatExpansionModule
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  subColumns: string[] = ['id', 'name_en', 'name_tr', 'slug', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    forkJoin({
      cats: this.categoryService.getAll(),
      subs: this.subCategoryService.getAll()
    }).subscribe({
      next: (res) => {
        this.categories = res.cats.data;
        this.subCategories = res.subs.data;
        this.cdr.detectChanges(); // Force UI update
      },
      error: (err) => this.snackBar.open('Error loading data', 'Close', { duration: 3000 })
    });
  }

  getSubCategories(categoryId: number): SubCategory[] {
    return this.subCategories.filter(s => s.category_id === categoryId);
  }

  openCategoryDialog(element?: Category) {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '600px',
      data: element || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this Category? All its sub-categories will also be deleted if constrained.')) {
      this.categoryService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Deleted successfully', 'Close', { duration: 3000 });
          this.loadData();
        },
        error: (err) => this.snackBar.open(err.error?.message || 'Error deleting', 'Close', { duration: 3000 })
      });
    }
  }

  openSubCategoryDialog(categoryId: number, element?: SubCategory) {
    // If we're adding a new sub-category, we need to pass the category_id implicitly
    const dataToPass = element ? element : { category_id: categoryId } as any;
    
    const dialogRef = this.dialog.open(SubCategoryFormComponent, {
      width: '600px',
      data: dataToPass
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  deleteSubCategory(id: number) {
    if (confirm('Are you sure you want to delete this SubCategory?')) {
      this.subCategoryService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Deleted successfully', 'Close', { duration: 3000 });
          this.loadData();
        },
        error: (err) => this.snackBar.open(err.error?.message || 'Error deleting', 'Close', { duration: 3000 })
      });
    }
  }
}
