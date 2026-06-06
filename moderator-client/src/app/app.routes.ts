import { Routes } from '@angular/router';
import { LoginComponent } from '@features/login/pages/login/login.component';
import { DashboardComponent } from '@features/dashboard/pages/dashboard/dashboard.component';
import { authGuard } from '@core/guards/auth.guard';
import { guestGuard } from '@core/guards/guest.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authGuard],
    children: [
      { path: 'categories', loadComponent: () => import('./features/categories/pages/list/categories-list.component').then(m => m.CategoryListComponent) },
      { path: 'educations', loadComponent: () => import('./features/educations/pages/list/educations-list.component').then(m => m.EducationListComponent) },
      { path: 'experiences', loadComponent: () => import('./features/experiences/pages/list/experiences-list.component').then(m => m.ExperienceListComponent) },
      { path: 'professional-skills', loadComponent: () => import('./features/professional-skills/pages/list/professional-skills-list.component').then(m => m.ProfessionalSkillListComponent) },
      { path: 'references', loadComponent: () => import('./features/references/pages/list/references-list.component').then(m => m.ReferenceListComponent) },
      { path: 'skills', loadComponent: () => import('./features/skills/pages/list/skills-list.component').then(m => m.SkillListComponent) },
      { path: 'blogs', loadComponent: () => import('./features/blogs/pages/list/blogs-list.component').then(m => m.BlogsListComponent) },
      { path: 'blogs/create', loadComponent: () => import('./features/blogs/pages/form/blogs-form.component').then(m => m.BlogsFormComponent) },
      { path: 'blogs/edit/:id', loadComponent: () => import('./features/blogs/pages/form/blogs-form.component').then(m => m.BlogsFormComponent) },
      { path: 'repos', loadComponent: () => import('./features/repos/pages/list/repos-list.component').then(m => m.ReposListComponent) },
      { path: 'repos/create', loadComponent: () => import('./features/repos/pages/form/repos-form.component').then(m => m.ReposFormComponent) },
      { path: 'repos/edit/:id', loadComponent: () => import('./features/repos/pages/form/repos-form.component').then(m => m.ReposFormComponent) },
      { path: 'interaction-requests', loadComponent: () => import('./features/interaction-requests/pages/list/list').then(m => m.List) },
      { path: 'interaction-requests/:id', loadComponent: () => import('./features/interaction-requests/pages/detail/detail').then(m => m.Detail) },
      { path: 'blog-interaction-requests', loadComponent: () => import('./features/blog-interaction-requests/pages/list/list').then(m => m.List) },
      { path: 'blog-interaction-requests/:id', loadComponent: () => import('./features/blog-interaction-requests/pages/detail/detail').then(m => m.Detail) },
      { path: 'repo-interaction-requests', loadComponent: () => import('./features/repo-interaction-requests/pages/list/list').then(m => m.List) },
      { path: 'repo-interaction-requests/:id', loadComponent: () => import('./features/repo-interaction-requests/pages/detail/detail').then(m => m.Detail) },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
