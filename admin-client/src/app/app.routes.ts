import { Routes } from '@angular/router';
import { LoginComponent } from '@features/login/pages/login/login.component';
import { DashboardComponent } from '@features/dashboard/pages/dashboard/dashboard.component';
import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';
import { DomainListComponent } from '@features/domains/pages/list/domain-list.component';
import { DomainCreateComponent } from '@features/domains/pages/create/domain-create.component';
import { DomainDetailComponent } from '@features/domains/pages/detail/domain-detail.component';
import { ModeratorDetailComponent } from '@features/moderators/pages/detail/moderator-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard],
    children: [
      { path: 'domains', component: DomainListComponent },
      { path: 'domains/create', component: DomainCreateComponent },
      { path: 'domains/:id', component: DomainDetailComponent },
      { path: 'moderators/:id', component: ModeratorDetailComponent }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
