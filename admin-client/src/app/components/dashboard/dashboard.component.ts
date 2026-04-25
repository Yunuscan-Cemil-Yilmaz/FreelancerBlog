import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <div class="dashboard-container">
      <mat-toolbar color="primary" class="dashboard-header">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>FreelancerBlog Admin Dashboard</span>
        <span class="spacer"></span>
        <button mat-icon-button (click)="logout()" title="Logout">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="sidenav">
          <mat-nav-list>
            <a mat-list-item href="#">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <div matListItemTitle>Overview</div>
            </a>
            <a mat-list-item href="#">
              <mat-icon matListItemIcon>article</mat-icon>
              <div matListItemTitle>Blog Posts</div>
            </a>
            <a mat-list-item href="#">
              <mat-icon matListItemIcon>category</mat-icon>
              <div matListItemTitle>Categories</div>
            </a>
            <a mat-list-item href="#">
              <mat-icon matListItemIcon>people</mat-icon>
              <div matListItemTitle>Users</div>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="content">
          <div class="welcome-section">
            <h1>Welcome back, Admin!</h1>
            <p>Select an option from the sidebar to manage your blog.</p>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <h3>Total Posts</h3>
              <p class="stat-value">24</p>
            </div>
            <div class="stat-card">
              <h3>Total Views</h3>
              <p class="stat-value">1.2k</p>
            </div>
            <div class="stat-card">
              <h3>Pending Comments</h3>
              <p class="stat-value">5</p>
            </div>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .dashboard-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .sidenav-container {
      flex: 1;
    }
    .sidenav {
      width: 250px;
      border-right: 1px solid #e0e0e0;
      background-color: #f8f9fa;
    }
    .content {
      padding: 30px;
      background-color: #f4f7f6;
    }
    .welcome-section {
      margin-bottom: 30px;
    }
    .welcome-section h1 {
      font-size: 28px;
      color: #333;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
    .stat-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      text-align: center;
    }
    .stat-card h3 {
      margin: 0;
      font-size: 16px;
      color: #666;
    }
    .stat-value {
      margin: 10px 0 0;
      font-size: 32px;
      font-weight: bold;
      color: #764ba2;
    }
  `]
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
