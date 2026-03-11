import { Component, inject, signal, computed, afterNextRender, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../../core/config/translation.service';
import { BlogsService, SortOption } from '../../domain/blogs.service';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { PaginationComponent } from '../../../../shared/ui/components/pagination/pagination.component';

const STORAGE_KEY = 'blog-list-state';
const PAGE_SIZE = 4;

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink, TruncatePipe, PaginationComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent {
  readonly t = inject(TranslationService);
  private readonly blogsService = inject(BlogsService);

  readonly selectedCategory = signal<string | undefined>(undefined);
  readonly selectedSubCategory = signal<string | undefined>(undefined);
  readonly sortBy = signal<SortOption>('newest');
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly categories = computed(() => this.blogsService.getCategories());
  readonly subCategories = computed(() => this.blogsService.getSubCategories(this.selectedCategory()));
  readonly blogs = computed(() =>
    this.blogsService.getFilteredAndSorted(this.selectedCategory(), this.selectedSubCategory(), this.sortBy())
  );

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.blogs().length / this.pageSize)));

  readonly paginatedBlogs = computed(() => {
    const page = this.currentPage();
    const total = this.totalPages();
    const safePage = page > total ? 1 : page;
    const start = (safePage - 1) * this.pageSize;
    return this.blogs().slice(start, start + this.pageSize);
  });

  constructor() {
    afterNextRender(() => {
      this.restoreState();
    });
  }

  setCategory(cat?: string): void {
    this.selectedCategory.set(cat);
    this.selectedSubCategory.set(undefined);
    this.currentPage.set(1);
    this.saveState();
  }

  setSubCategory(sub?: string): void {
    this.selectedSubCategory.set(sub);
    this.currentPage.set(1);
    this.saveState();
  }

  setSort(sort: SortOption): void {
    this.sortBy.set(sort);
    this.currentPage.set(1);
    this.saveState();
  }

  setPage(page: number): void {
    const total = this.totalPages();
    const safePage = page > total ? 1 : page;
    this.currentPage.set(safePage);
    this.saveState();
  }

  formatViewCount(count: number): string {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  }

  private saveState(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        sortBy: this.sortBy(),
        category: this.selectedCategory(),
        subCategory: this.selectedSubCategory(),
        currentPage: this.currentPage(),
      }));
    } catch {}
  }

  private restoreState(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const state = JSON.parse(raw);

      if (['newest', 'oldest', 'popular'].includes(state.sortBy)) {
        this.sortBy.set(state.sortBy);
      }

      if (state.category) {
        this.selectedCategory.set(state.category);
      }
      if (state.subCategory) {
        this.selectedSubCategory.set(state.subCategory);
      }

      const total = this.totalPages();
      const page = typeof state.currentPage === 'number' ? state.currentPage : 1;
      if (page > total || page < 1) {
        this.currentPage.set(1);
        this.saveState();
      } else {
        this.currentPage.set(page);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
