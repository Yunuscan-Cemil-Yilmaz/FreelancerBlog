import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':lang/blogs/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: ':lang/repos/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: ':lang',
    renderMode: RenderMode.Server,
  },
  {
    path: ':lang/**',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
