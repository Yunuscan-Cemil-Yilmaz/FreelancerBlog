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
  template: `
    <div class="header-container">
      <h2>Category & SubCategory Management</h2>
      <button mat-raised-button color="primary" (click)="openCategoryDialog()">
        <mat-icon>add</mat-icon> Add Category
      </button>
    </div>

    <mat-accordion multi="true">
      <mat-expansion-panel *ngFor="let category of categories">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <strong>{{ category.name_en }}</strong> &nbsp; ({{ category.name_tr }})
          </mat-panel-title>
          <mat-panel-description>
            Slug: {{ category.slug }}
          </mat-panel-description>
        </mat-expansion-panel-header>

        <div class="category-actions">
          <button mat-button color="primary" (click)="openCategoryDialog(category)">
            <mat-icon>edit</mat-icon> Edit Category
          </button>
          <button mat-button color="warn" (click)="deleteCategory(category.id)">
            <mat-icon>delete</mat-icon> Delete Category
          </button>
        </div>

        <div class="sub-category-section">
          <div class="sub-header">
            <h3>SubCategories</h3>
            <button mat-stroked-button color="primary" (click)="openSubCategoryDialog(category.id)">
              <mat-icon>add</mat-icon> Add SubCategory
            </button>
          </div>

          <table mat-table [dataSource]="getSubCategories(category.id)" class="mat-elevation-z1 sub-table">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef> ID </th>
              <td mat-cell *matCellDef="let element"> {{element.id}} </td>
            </ng-container>
            
            <ng-container matColumnDef="name_en">
              <th mat-header-cell *matHeaderCellDef> name_en </th>
              <td mat-cell *matCellDef="let element"> {{ element.name_en }} </td>
            </ng-container>
            
            <ng-container matColumnDef="name_tr">
              <th mat-header-cell *matHeaderCellDef> name_tr </th>
              <td mat-cell *matCellDef="let element"> {{ element.name_tr }} </td>
            </ng-container>
            
            <ng-container matColumnDef="slug">
              <th mat-header-cell *matHeaderCellDef> slug </th>
              <td mat-cell *matCellDef="let element"> {{ element.slug }} </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let element">
                <button mat-icon-button color="primary" (click)="openSubCategoryDialog(category.id, element)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteSubCategory(element.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="subColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: subColumns;"></tr>
          </table>
          <p *ngIf="getSubCategories(category.id).length === 0" class="no-data">No SubCategories found.</p>
        </div>
      </mat-expansion-panel>
    </mat-accordion>
  `,
  styles: [`
    .header-container { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .category-actions { margin-bottom: 15px; display: flex; gap: 10px; }
    .sub-category-section { border-top: 1px solid #eee; padding-top: 15px; }
    .sub-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
    .sub-table { width: 100%; margin-bottom: 15px; }
    .no-data { color: #888; font-style: italic; text-align: center; margin-top: 10px; }
  `]
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
