import { Component, inject, input, effect, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../../core/config/translation.service';
import { BlogsService } from '../../domain/blogs.service';
import { SeoService } from '../../../../core/seo/seo.service';
import { MarkdownService } from '../../../../shared/services/markdown.service';
import { BlogHeader } from '../../components/blog-header/blog-header.component';
import { GalleryCarouselComponent } from '../../../../shared/ui/components/gallery-carousel/gallery-carousel.component';
import { ImageLightboxComponent } from '../../../../shared/ui/components/image-lightbox/image-lightbox.component';
import { InteractionFormComponent } from '../../../../shared/ui/components/interaction-form/interaction-form.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterLink, BlogHeader, GalleryCarouselComponent, ImageLightboxComponent, InteractionFormComponent],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent {
  readonly t = inject(TranslationService);
  private readonly blogsService = inject(BlogsService);
  private readonly seo = inject(SeoService);
  private readonly markdown = inject(MarkdownService);

  readonly slug = input.required<string>();
  readonly blog = this.blogsService.blogDetail;
  readonly isLoading = this.blogsService.blogLoading;
  readonly renderedContent = signal('');

  constructor() {
    toObservable(this.slug).subscribe(slug => {
      if (slug) {
        this.blogsService.loadBlogBySlug(slug);
      }
    });

    effect(() => {
      const blog = this.blog();
      if (blog) {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        this.seo.update({
          title: blog.title,
          description: blog.excerpt,
          image: blog.imageUrl,
          author: blog.author,
          type: 'article',
          url: `${origin}/${this.t.lang()}/blogs/${blog.slug}`
        });
        this.blogsService.incrementViewCount(blog.id);
        this.markdown.render(blog.content).then(html => this.renderedContent.set(html));
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
