import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InteractionRequestService } from '../../services/interaction-requests';

@Component({
  selector: 'app-interaction-requests-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatInputModule, MatTableModule],
  templateUrl: './detail.html',
  styleUrls: ['./detail.css']
})
export class Detail implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  service = inject(InteractionRequestService);
  snackBar = inject(MatSnackBar);
  cdr = inject(ChangeDetectorRef);

  id!: number;
  data: any;

  detailColumns: string[] = ['id', 'interaction_note', 'actions'];
  
  newDetail: any = {
    interaction_note: ''
  };

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData() {
    this.service.getDetail(this.id).subscribe({
      next: (res) => {
        this.data = res;
        this.cdr.detectChanges();
      },
      error: () => {
        this.snackBar.open('Not found', 'Close', { duration: 3000 });
        this.router.navigate(['/dashboard/interaction-requests']);
      }
    });
  }

  updateRead(event: any) {
    this.service.updateReadStatus(this.id, event.checked).subscribe(() => this.snackBar.open('Updated', 'Close', { duration: 2000 }));
  }

  updateHandled(event: any) {
    this.service.updateHandledStatus(this.id, event.checked).subscribe(() => this.snackBar.open('Updated', 'Close', { duration: 2000 }));
  }

  updateCompleted(event: any) {
    this.service.updateCompletedStatus(this.id, event.checked).subscribe(() => this.snackBar.open('Updated', 'Close', { duration: 2000 }));
  }

  saveAdminNote() {
    this.service.updateAdminNote(this.id, this.data.admin_note).subscribe(() => this.snackBar.open('Admin note saved', 'Close', { duration: 2000 }));
  }

  deleteInteraction() {
    if(confirm('Are you sure you want to delete this interaction and all its details?')) {
      this.service.delete(this.id).subscribe(() => {
        this.snackBar.open('Deleted successfully', 'Close', { duration: 2000 });
        this.router.navigate(['/dashboard/interaction-requests']);
      });
    }
  }

  addDetail() {
    if(!this.newDetail.interaction_note) return;
    const payload = { ...this.newDetail };
    payload['interaction_id'] = this.id;
    
    this.service.addDetail(payload).subscribe(() => {
      this.snackBar.open('Detail added', 'Close', { duration: 2000 });
      this.newDetail.interaction_note = '';
      this.loadData();
    });
  }

  deleteDetail(detailId: number) {
    if(confirm('Delete this detail?')) {
      this.service.deleteDetail(detailId).subscribe(() => {
        this.snackBar.open('Detail deleted', 'Close', { duration: 2000 });
        this.loadData();
      });
    }
  }
}