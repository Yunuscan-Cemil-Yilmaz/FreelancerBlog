import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <div class="dashboard-container">
      <mat-toolbar color="primary" class="dashboard-toolbar">
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>Moderator Panel</span>
        <span class="spacer"></span>
        <button mat-icon-button (click)="logout()">
          <mat-icon>logout</mat-icon>
        </button>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened class="dashboard-sidenav">
          <mat-nav-list>
            <a mat-list-item routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <span matListItemTitle>Overview</span>
            </a>
            <div class="list-header">Content Management</div>
            <a mat-list-item routerLink="/dashboard/categories" routerLinkActive="active">
              <mat-icon matListItemIcon>category</mat-icon>
              <span matListItemTitle>Categories</span>
            </a>
            <a mat-list-item routerLink="/dashboard/educations" routerLinkActive="active">
              <mat-icon matListItemIcon>school</mat-icon>
              <span matListItemTitle>Educations</span>
            </a>
            <a mat-list-item routerLink="/dashboard/experiences" routerLinkActive="active">
              <mat-icon matListItemIcon>work</mat-icon>
              <span matListItemTitle>Experiences</span>
            </a>
            <a mat-list-item routerLink="/dashboard/professional-skills" routerLinkActive="active">
              <mat-icon matListItemIcon>stars</mat-icon>
              <span matListItemTitle>Professional Skills</span>
            </a>
            <a mat-list-item routerLink="/dashboard/references" routerLinkActive="active">
              <mat-icon matListItemIcon>people</mat-icon>
              <span matListItemTitle>References</span>
            </a>
            <a mat-list-item routerLink="/dashboard/skills" routerLinkActive="active">
              <mat-icon matListItemIcon>code</mat-icon>
              <span matListItemTitle>Skills</span>
            </a>
            <a mat-list-item routerLink="/dashboard/blogs" routerLinkActive="active">
              <mat-icon matListItemIcon>article</mat-icon>
              <span matListItemTitle>Blogs</span>
            </a>
            <a mat-list-item routerLink="/dashboard/repos" routerLinkActive="active">
              <mat-icon matListItemIcon>code</mat-icon>
              <span matListItemTitle>Repos</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="dashboard-content">
          <div class="content-wrapper">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .sidenav-container {
      flex: 1;
    }
    .dashboard-sidenav {
      width: 250px;
      border-right: 1px solid #ddd;
    }
    .dashboard-toolbar {
      display: flex;
      justify-content: space-between;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      z-index: 2;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .active {
      background-color: rgba(63, 81, 181, 0.1);
      color: #3f51b5;
      border-right: 4px solid #3f51b5;
    }
    .dashboard-content {
      background-color: #f5f5f5;
    }
    .content-wrapper {
      padding: 20px;
    }
    .list-header {
      padding: 15px;
      font-size: 12px;
      text-transform: uppercase;
      color: #757575;
      font-weight: bold;
      letter-spacing: 1px;
    }
  `]
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
