import { Component, inject, input, effect, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../../core/config/translation.service';
import { ReposService } from '../../domain/repos.service';
import { SeoService } from '../../../../core/seo/seo.service';
import { MarkdownService } from '../../../../shared/services/markdown.service';
import { GalleryCarouselComponent } from '../../../../shared/ui/components/gallery-carousel/gallery-carousel.component';
import { ImageLightboxComponent } from '../../../../shared/ui/components/image-lightbox/image-lightbox.component';
import { InteractionFormComponent } from '../../../../shared/ui/components/interaction-form/interaction-form.component';

@Component({
  selector: 'app-repo-detail',
  standalone: true,
  imports: [RouterLink, GalleryCarouselComponent, ImageLightboxComponent, InteractionFormComponent],
  templateUrl: './repo-detail.component.html',
  styleUrl: './repo-detail.component.scss',
})
export class RepoDetailComponent {
  readonly slug = input.required<string>();
  private readonly reposService = inject(ReposService);
  private readonly seoService = inject(SeoService);
  private readonly markdown = inject(MarkdownService);
  readonly t = inject(TranslationService);

  readonly repo = this.reposService.repoDetail;
  readonly isLoading = this.reposService.repoLoading;
  readonly renderedContent = signal('');

  constructor() {
    toObservable(this.slug).subscribe(slug => {
      if (slug) {
        this.reposService.loadRepoBySlug(slug);
      }
    });

    effect(() => {
      const r = this.repo();
      if (r) {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        this.seoService.update({
          title: r.title,
          description: r.description.substring(0, 160),
          image: r.imageUrl,
          type: 'article',
          url: `${origin}/${this.t.lang()}/repos/${r.slug}`
        });
        this.reposService.incrementViewCount(r.id);
        this.markdown.render(r.description).then(html => this.renderedContent.set(html));
      }
    });
  }

  lightboxOpen = false;
  lightboxImage = '';

  openLightbox(imageUrl: string): void {
    this.lightboxImage = imageUrl;
    this.lightboxOpen = true;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.lightboxImage = '';
  }
}

