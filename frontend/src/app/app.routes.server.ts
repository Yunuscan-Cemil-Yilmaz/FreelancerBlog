import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blogs/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: ':lang/blogs/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: 'repos/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: ':lang/repos/:slug',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
