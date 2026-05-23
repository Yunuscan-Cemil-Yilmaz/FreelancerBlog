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
  template: `
    <div class="header-container">
      <h2>SubCategory Management</h2>
      <button mat-raised-button color="primary" (click)="openDialog()">
        <mat-icon>add</mat-icon> Add New
      </button>
    </div>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
      </ng-container>
        <ng-container matColumnDef="category_id">
          <th mat-header-cell *matHeaderCellDef> category_id </th>
          <td mat-cell *matCellDef="let element"> {{ element.category_id }} </td>
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
          <button mat-icon-button color="primary" (click)="openDialog(element)">
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
  `,
  styles: [`
    .header-container { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    table { width: 100%; }
  `]
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
