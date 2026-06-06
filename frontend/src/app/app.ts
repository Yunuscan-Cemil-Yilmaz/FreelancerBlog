import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToastContainerComponent } from './shared/toast/toast.component';
import { SeoService } from './core/seo/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastContainerComponent],
  template: `<router-outlet /><app-toast-container />`,
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.seoService.resetToDefaults();
    });
  }
}
