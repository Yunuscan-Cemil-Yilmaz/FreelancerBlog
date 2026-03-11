import { Component, inject, signal, computed, afterNextRender } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../../core/config/translation.service';
import { ReposService, SortOption } from '../../domain/repos.service';
import { TruncatePipe } from '../../../../shared/pipes/truncate.pipe';
import { PaginationComponent } from '../../../../shared/ui/components/pagination/pagination.component';

const STORAGE_KEY = 'repo-list-state';
const PAGE_SIZE = 4;

@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [RouterLink, TruncatePipe, PaginationComponent],
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.scss',
})
export class RepoListComponent {
  readonly t = inject(TranslationService);
  private readonly reposService = inject(ReposService);

  readonly sortBy = signal<SortOption>('newest');
  readonly currentPage = signal(1);
  readonly pageSize = PAGE_SIZE;

  readonly sortedRepos = computed(() => this.reposService.getSorted(this.sortBy()));

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.sortedRepos().length / this.pageSize)));

  readonly paginatedRepos = computed(() => {
    const page = this.currentPage();
    const total = this.totalPages();
    const safePage = page > total ? 1 : page;
    if (safePage !== page) {
      // page overflow — will be corrected in the guard below
    }
    const start = (safePage - 1) * this.pageSize;
    return this.sortedRepos().slice(start, start + this.pageSize);
  });

  constructor() {
    afterNextRender(() => {
      this.restoreState();
    });
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
