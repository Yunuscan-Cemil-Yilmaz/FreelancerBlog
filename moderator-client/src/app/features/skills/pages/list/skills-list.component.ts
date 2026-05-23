import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { SkillService } from '../../services/skills.service';
import { Skill } from '../../domain/skills';
import { SkillFormComponent } from '../../components/skills-form/skills-form.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-skills-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule, MatChipsModule, DragDropModule],
  template: `
    <div class="header-container">
      <h2>Skill Management</h2>
      <button mat-raised-button color="primary" (click)="openDialog()">
        <mat-icon>add</mat-icon> Add New
      </button>
    </div>

    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" cdkDropList [cdkDropListData]="dataSource" (cdkDropListDropped)="drop($event)">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
      </ng-container>

        <ng-container matColumnDef="category_en">
          <th mat-header-cell *matHeaderCellDef> Category (EN) </th>
          <td mat-cell *matCellDef="let element"> {{ element.category_en }} </td>
        </ng-container>
        <ng-container matColumnDef="category_tr">
          <th mat-header-cell *matHeaderCellDef> Category (TR) </th>
          <td mat-cell *matCellDef="let element"> {{ element.category_tr }} </td>
        </ng-container>
        <ng-container matColumnDef="items">
          <th mat-header-cell *matHeaderCellDef> Items </th>
          <td mat-cell *matCellDef="let element">
            <mat-chip-set>
              <mat-chip *ngFor="let item of element.items">
                {{ item.name }} <span style="opacity: 0.7; font-size: 0.8em; margin-left: 4px;">({{ item.level }})</span>
              </mat-chip>
            </mat-chip-set>
          </td>
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
      <tr mat-row *matRowDef="let row; columns: displayedColumns;" cdkDrag [cdkDragData]="row"></tr>
    </table>
  `,
  styles: [`
    .header-container { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    table { width: 100%; }
  `]
})
export class SkillListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'category_en', 'category_tr', 'items', 'actions'];
  dataSource: Skill[] = [];

  drop(event: CdkDragDrop<Skill[]>) {
    const prevIndex = this.dataSource.findIndex(d => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.dataSource = [...this.dataSource]; // trigger change detection

    const orders = this.dataSource.map((item, index) => ({
      id: item.id,
      order: index + 1
    }));

    this.service.updateOrder(orders).subscribe({
      next: () => this.snackBar.open('Order updated successfully', 'Close', { duration: 3000 }),
      error: (err) => {
        this.snackBar.open('Error updating order', 'Close', { duration: 3000 });
        this.loadData(); // Revert changes on error
      }
    });
  }

  constructor(
    private service: SkillService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe({
      next: (res) => { 
        this.dataSource = res.data.sort((a, b) => (a.order || 0) - (b.order || 0)); 
        this.cdr.detectChanges(); 
      },
      error: (err) => this.snackBar.open('Error loading data', 'Close', { duration: 3000 })
    });
  }

  openDialog(element?: Skill) {
    const dialogRef = this.dialog.open(SkillFormComponent, {
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
