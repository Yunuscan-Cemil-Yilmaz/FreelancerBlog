import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ExperienceService } from '../../services/experiences.service';
import { Experience } from '../../domain/experiences';
import { ExperienceFormComponent } from '../../components/experiences-form/experiences-form.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-experiences-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule, DragDropModule],
  template: `
    <div class="header-container">
      <h2>Experience Management</h2>
      <button mat-raised-button color="primary" (click)="openDialog()">
        <mat-icon>add</mat-icon> Add New
      </button>
    </div>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" cdkDropList (cdkDropListDropped)="drop($event)" >
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
      </ng-container>
        <ng-container matColumnDef="order">
          <th mat-header-cell *matHeaderCellDef> Order </th>
          <td mat-cell *matCellDef="let element">
            <mat-icon style="cursor: grab;">drag_indicator</mat-icon> {{element.order}}
          </td>
        </ng-container>
        <ng-container matColumnDef="year_en">
          <th mat-header-cell *matHeaderCellDef> year_en </th>
          <td mat-cell *matCellDef="let element"> {{ element.year_en }} </td>
        </ng-container>
        <ng-container matColumnDef="year_tr">
          <th mat-header-cell *matHeaderCellDef> year_tr </th>
          <td mat-cell *matCellDef="let element"> {{ element.year_tr }} </td>
        </ng-container>
        <ng-container matColumnDef="role_en">
          <th mat-header-cell *matHeaderCellDef> role_en </th>
          <td mat-cell *matCellDef="let element"> {{ element.role_en }} </td>
        </ng-container>
        <ng-container matColumnDef="role_tr">
          <th mat-header-cell *matHeaderCellDef> role_tr </th>
          <td mat-cell *matCellDef="let element"> {{ element.role_tr }} </td>
        </ng-container>
        <ng-container matColumnDef="company_en">
          <th mat-header-cell *matHeaderCellDef> company_en </th>
          <td mat-cell *matCellDef="let element"> {{ element.company_en }} </td>
        </ng-container>
        <ng-container matColumnDef="company_tr">
          <th mat-header-cell *matHeaderCellDef> company_tr </th>
          <td mat-cell *matCellDef="let element"> {{ element.company_tr }} </td>
        </ng-container>
        <ng-container matColumnDef="description_en">
          <th mat-header-cell *matHeaderCellDef> description_en </th>
          <td mat-cell *matCellDef="let element"> {{ element.description_en }} </td>
        </ng-container>
        <ng-container matColumnDef="description_tr">
          <th mat-header-cell *matHeaderCellDef> description_tr </th>
          <td mat-cell *matCellDef="let element"> {{ element.description_tr }} </td>
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
      <tr mat-row *matRowDef="let row; columns: displayedColumns;" cdkDrag></tr>
    </table>
  `,
  styles: [`
    .header-container { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    table { width: 100%; }
  `]
})
export class ExperienceListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'year_en', 'year_tr', 'role_en', 'role_tr', 'company_en', 'company_tr', 'description_en', 'description_tr', 'order', 'actions'];
  dataSource: Experience[] = [];

  constructor(
    private service: ExperienceService,
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

  openDialog(element?: Experience) {
    const dialogRef = this.dialog.open(ExperienceFormComponent, {
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
  drop(event: CdkDragDrop<Experience[]>) {
    moveItemInArray(this.dataSource, event.previousIndex, event.currentIndex);
    
    // Update local orders
    this.dataSource.forEach((item, index) => item.order = index + 1);
    
    // Create payload
    const orders = this.dataSource.map(item => ({ id: item.id, order: item.order }));
    
    this.service.updateOrder(orders).subscribe({
      next: () => this.snackBar.open('Order updated successfully', 'Close', { duration: 3000 }),
      error: (err) => this.snackBar.open(err.error?.message || 'Error updating order', 'Close', { duration: 3000 })
    });
    
    // Trigger change detection for table
    this.dataSource = [...this.dataSource];
  }
}
