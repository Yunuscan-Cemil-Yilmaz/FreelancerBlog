import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReferenceService } from '../../services/references.service';
import { Reference } from '../../domain/references';
import { ReferenceFormComponent } from '../../components/references-form/references-form.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-references-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule, DragDropModule],
  templateUrl: './references-list.component.html',
  styleUrl: './references-list.component.css'
})
export class ReferenceListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'role_en', 'role_tr', 'company', 'quote_en', 'quote_tr', 'order', 'actions'];
  dataSource: Reference[] = [];

  constructor(
    private service: ReferenceService,
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

  openDialog(element?: Reference) {
    const dialogRef = this.dialog.open(ReferenceFormComponent, {
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
  drop(event: CdkDragDrop<Reference[]>) {
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
