import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/pages/about/about.component').then(m => m.AboutComponent),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./features/contact/pages/contact/contact.component').then(m => m.ContactComponent),
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./features/blogs/pages/list/blog-list.component').then(m => m.BlogListComponent),
      },
      {
        path: 'blogs/:slug',
        loadComponent: () =>
          import('./features/blogs/pages/detail/blog-detail.component').then(m => m.BlogDetailComponent),
      },
      {
        path: 'repos',
        loadComponent: () =>
          import('./features/repos/pages/list/repo-list.component').then(m => m.RepoListComponent),
      },
      {
        path: 'repos/:slug',
        loadComponent: () =>
          import('./features/repos/pages/detail/repo-detail.component').then(m => m.RepoDetailComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
