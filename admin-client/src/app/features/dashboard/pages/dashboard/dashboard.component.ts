import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    RouterModule
  ],
  template: `
    <div class="dashboard-container">
      <mat-toolbar color="primary" class="dashboard-header">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span style="cursor: pointer" routerLink="/dashboard">FreelancerBlog Admin Dashboard</span>
        <span class="spacer"></span>
        <button mat-icon-button (click)="logout()" title="Logout">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="sidenav">
          <mat-nav-list>
            <mat-expansion-panel class="mat-elevation-z0" style="background: transparent;" [expanded]="true">
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon style="margin-right: 16px;">language</mat-icon>
                  Domains
                </mat-panel-title>
              </mat-expansion-panel-header>
              <mat-nav-list class="submenu">
                <a mat-list-item routerLink="/dashboard/domains/create" routerLinkActive="active-link">
                  <mat-icon matListItemIcon>add</mat-icon>
                  <div matListItemTitle>Create Domain</div>
                </a>
                <a mat-list-item routerLink="/dashboard/domains" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
                  <mat-icon matListItemIcon>list</mat-icon>
                  <div matListItemTitle>Domain List</div>
                </a>
              </mat-nav-list>
            </mat-expansion-panel>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="content">
          <router-outlet></router-outlet>
          
          <div *ngIf="router.url === '/dashboard'">
            <div class="welcome-section">
              <h1>Welcome back, Admin!</h1>
              <p>Select an option from the sidebar to manage your system.</p>
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
    ::ng-deep .mat-expansion-panel-body {
      padding: 0 0 0 16px !important;
    }
    .submenu a {
      padding-left: 16px;
    }
    .active-link {
      background: rgba(0, 0, 0, 0.04);
      color: #764ba2;
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
  constructor(public router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
