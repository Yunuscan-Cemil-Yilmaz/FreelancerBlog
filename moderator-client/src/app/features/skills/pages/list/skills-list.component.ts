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
  templateUrl: './skills-list.component.html',
  styleUrl: './skills-list.component.css'
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
