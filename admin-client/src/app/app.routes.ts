import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { DomainListComponent } from './components/domains/domain-list/domain-list.component';
import { DomainCreateComponent } from './components/domains/domain-create/domain-create.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard],
    children: [
      { path: 'domains', component: DomainListComponent },
      { path: 'domains/create', component: DomainCreateComponent }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
