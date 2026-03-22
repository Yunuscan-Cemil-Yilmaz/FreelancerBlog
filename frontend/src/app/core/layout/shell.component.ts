import { Component, inject, signal, effect } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute, Router } from '@angular/router';
import { TranslationService, Lang } from '../config/translation.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  readonly t = inject(TranslationService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly env = environment;
  readonly mobileMenuOpen = signal(false);

  constructor() {
    this.route.params.subscribe(params => {
      const lang = params['lang'] as Lang;
      if (lang && (lang === 'en' || lang === 'tr')) {
        this.t.setLang(lang);
      }
    });
  }

  toggleMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  changeLang(lang: Lang): void {
    const url = this.router.url;
    // Replace the first segment (the lang) with the new lang
    const segments = url.split('/');
    segments[1] = lang;
    this.router.navigateByUrl(segments.join('/'));
  }
}
