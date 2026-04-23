import { Component, inject, input, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../../core/config/translation.service';
import { ReposService } from '../../domain/repos.service';
import { SeoService } from '../../../../core/seo/seo.service';
import { GalleryCarouselComponent } from '../../../../shared/ui/components/gallery-carousel/gallery-carousel.component';
import { ImageLightboxComponent } from '../../../../shared/ui/components/image-lightbox/image-lightbox.component';

@Component({
  selector: 'app-repo-detail',
  standalone: true,
  imports: [RouterLink, GalleryCarouselComponent, ImageLightboxComponent],
  templateUrl: './repo-detail.component.html',
  styleUrl: './repo-detail.component.scss',
})
export class RepoDetailComponent {
  readonly slug = input.required<string>();
  private readonly reposService = inject(ReposService);
  private readonly seoService = inject(SeoService);
  readonly t = inject(TranslationService);

  readonly repo = computed(() => this.reposService.repos().find(r => r.slug === this.slug()));

  constructor() {
    effect(() => {
      const r = this.repo();
      if (r) {
        this.seoService.update({
          title: r.title,
          description: r.description.substring(0, 160),
          image: r.imageUrl,
          type: 'article',
          url: `${window.location.origin}/${this.t.lang()}/repos/${r.slug}`
        });
        this.reposService.incrementViewCount(r.id);
      }
    });
  }

  readonly renderedContent = computed(() => {
    const repo = this.repo();
    if (!repo) return '';
    return this.renderMarkdown(repo.description);
  });

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

  private renderMarkdown(md: string): string {
    let html = md;
    html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-8 mb-3">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-black text-white mt-6 mb-4">$1</h1>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-white/10 rounded text-violet-300 text-sm font-mono">$1</code>');
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="p-4 bg-[#0d1117] rounded-xl border border-white/5 overflow-x-auto my-4"><code class="text-sm text-slate-300 font-mono">$2</code></pre>');
    html = html.replace(/^- (.+)$/gm, '<li class="text-slate-300 ml-4 list-disc mb-1">$1</li>');
    html = html.replace(/\n\n/g, '</p><p class="text-slate-300 leading-relaxed mb-4">');
    html = '<p class="text-slate-300 leading-relaxed mb-4">' + html + '</p>';
    return html;
  }
}
