import { Component, inject, signal, computed, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../../core/config/translation.service';
import { BlogsService, SortOption } from '../../domain/blogs.service';
import { CategoryService } from '../../domain/category.service';
import { Category, SubCategory } from '../../domain/category.models';
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
  private readonly categoryService = inject(CategoryService);

  readonly selectedCategoryId = signal<number | undefined>(undefined);
  readonly selectedSubCategoryId = signal<number | undefined>(undefined);
  readonly sortBy = signal<SortOption>('newest');
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly categories = this.categoryService.categories;
  readonly subCategories = computed(() => {
    const catId = this.selectedCategoryId();
    if (!catId) return [];
    const cat = this.categories().find(c => c.id === catId);
    return cat?.subCategories || [];
  });
  readonly blogs = this.blogsService.blogs;
  readonly totalPages = this.blogsService.totalPages;

  readonly paginatedBlogs = computed(() => {
    const page = this.currentPage();
    const total = this.totalPages();
    const safePage = page > total ? 1 : page;
    const start = (safePage - 1) * this.pageSize;
    return this.blogs().slice(start, start + this.pageSize);
  });

  constructor() {
    this.categoryService.loadCategories();
    afterNextRender(() => {
      this.restoreState();
      this.loadData();
    });
  }

  private loadData(): void {
    this.blogsService.loadBlogs({
      sort: this.sortBy(),
      categoryId: this.selectedCategoryId(),
      subCategoryId: this.selectedSubCategoryId(),
      page: this.currentPage(),
      perPage: this.pageSize,
    });
  }

  setCategory(cat?: Category): void {
    this.selectedCategoryId.set(cat?.id);
    this.selectedSubCategoryId.set(undefined);
    this.currentPage.set(1);
    this.saveState();
    this.loadData();
  }

  setSubCategory(sub?: SubCategory): void {
    this.selectedSubCategoryId.set(sub?.id);
    this.currentPage.set(1);
    this.saveState();
    this.loadData();
  }

  setSort(sort: SortOption): void {
    this.sortBy.set(sort);
    this.currentPage.set(1);
    this.saveState();
    this.loadData();
  }

  setPage(page: number): void {
    this.currentPage.set(page);
    this.saveState();
    this.loadData();
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
        categoryId: this.selectedCategoryId(),
        subCategoryId: this.selectedSubCategoryId(),
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

      if (state.categoryId) {
        this.selectedCategoryId.set(state.categoryId);
      }
      if (state.subCategoryId) {
        this.selectedSubCategoryId.set(state.subCategoryId);
      }

      this.currentPage.set(typeof state.currentPage === 'number' ? state.currentPage : 1);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
