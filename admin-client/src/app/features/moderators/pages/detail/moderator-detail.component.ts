import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ModeratorService, Moderator } from '../../domain/moderator';

@Component({
  selector: 'app-moderator-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './moderator-detail.component.html',
  styleUrl: './moderator-detail.component.css'
})
export class ModeratorDetailComponent implements OnInit {
  moderator: Moderator | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetails(+id);
    }
  }

  loadDetails(id: number): void {
    this.isLoading = true;
    this.cdr.detectChanges();

    this.moderatorService.getModeratorDetails(id).subscribe({
      next: (response: any) => {
        this.moderator = response.data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.isLoading = false;
        this.errorMessage = 'Moderator details could not be loaded.';
        this.snackBar.open(this.errorMessage, 'Close', { duration: 5000 });
        this.cdr.detectChanges();
      }
    });
  }
}
