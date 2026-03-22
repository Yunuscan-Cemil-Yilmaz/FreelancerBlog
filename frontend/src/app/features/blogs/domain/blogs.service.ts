import { Injectable, inject, signal, computed } from '@angular/core';
import { Blog } from './blogs.models';
import { TranslationService } from '../../../core/config/translation.service';
import { ApiClient } from '../../../core/http/api-client';

export type SortOption = 'newest' | 'oldest' | 'popular';

interface BlogsApiResponse {
  data: Blog[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface BlogApiResponse {
  data: Blog;
}

@Injectable({ providedIn: 'root' })
export class BlogsService {
  private readonly t = inject(TranslationService);
  private readonly api = inject(ApiClient);

  private readonly blogsSignal = signal<Blog[]>([]);
  private readonly totalPagesSignal = signal(1);
  private readonly totalSignal = signal(0);
  private loaded = false;

  readonly blogs = this.blogsSignal.asReadonly();
  readonly totalPages = this.totalPagesSignal.asReadonly();
  readonly total = this.totalSignal.asReadonly();

  /**
   * Load blogs from API with filtering, sorting, and pagination.
   */
  loadBlogs(options: {
    sort?: SortOption;
    categoryId?: number;
    subCategoryId?: number;
    page?: number;
    perPage?: number;
  } = {}): void {
    const lang = this.t.lang();
    const params: string[] = [];

    if (options.sort) params.push(`sort=${options.sort}`);
    if (options.categoryId) params.push(`category_id=${options.categoryId}`);
    if (options.subCategoryId) params.push(`sub_category_id=${options.subCategoryId}`);
    if (options.page) params.push(`page=${options.page}`);
    if (options.perPage) params.push(`per_page=${options.perPage}`);

    const query = params.length ? `?${params.join('&')}` : '';

    this.api.get<BlogsApiResponse>(`${lang}/blogs${query}`).subscribe({
      next: (res) => {
        this.blogsSignal.set(res.data);
        this.totalPagesSignal.set(res.meta.last_page);
        this.totalSignal.set(res.meta.total);
        this.loaded = true;
      },
      error: () => {
        this.blogsSignal.set([]);
        this.loaded = true;
      },
    });
  }

  /**
   * Get a single blog by slug (API call).
   * Returns a signal that will be updated when data arrives.
   */
  loadBlogBySlug(slug: string): { blog: () => Blog | undefined } {
    const lang = this.t.lang();
    this._blogDetailSignal.set(undefined);

    this.api.get<BlogApiResponse>(`${lang}/blogs/${slug}`).subscribe({
      next: (res) => this._blogDetailSignal.set(res.data),
      error: () => this._blogDetailSignal.set(undefined),
    });

    return { blog: () => this._blogDetailSignal() };
  }

  private readonly _blogDetailSignal = signal<Blog | undefined>(undefined);
  readonly blogDetail = this._blogDetailSignal.asReadonly();

  /**
   * Increment view count for a blog.
   */
  incrementViewCount(id: number): void {
    this.api.patch<{ viewCount: number }>(`blogs/${id}/view`, {}).subscribe();
  }

  // --- Backward compatibility methods (used by current components) ---

  getBlogs(): Blog[] {
    if (!this.loaded) {
      this.loadBlogs();
    }
    return this.blogsSignal();
  }

  getBlogBySlug(slug: string): Blog | undefined {
    // Try from loaded blogs first
    const found = this.blogsSignal().find(b => b.slug === slug);
    if (found) return found;

    // Trigger load if not found
    this.loadBlogBySlug(slug);
    return this._blogDetailSignal();
  }

  getCategories(): string[] {
    return [...new Set(this.blogsSignal().map(b => b.category))];
  }

  getSubCategories(category?: string): string[] {
    let blogs = this.blogsSignal();
    if (category) {
      blogs = blogs.filter(b => b.category === category);
    }
    return [...new Set(blogs.map(b => b.subCategory))];
  }

  getFilteredAndSorted(category?: string, subCategory?: string, sort: SortOption = 'newest'): Blog[] {
    let blogs = [...this.blogsSignal()];

    if (category) {
      blogs = blogs.filter(b => b.category === category);
    }
    if (subCategory) {
      blogs = blogs.filter(b => b.subCategory === subCategory);
    }

    switch (sort) {
      case 'newest':
        blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        blogs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        blogs.sort((a, b) => b.viewCount - a.viewCount);
        break;
    }

    return blogs;
  }
}
