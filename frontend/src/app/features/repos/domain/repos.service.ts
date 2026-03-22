import { Injectable, inject, signal } from '@angular/core';
import { Repo } from './repos.models';
import { TranslationService } from '../../../core/config/translation.service';
import { ApiClient } from '../../../core/http/api-client';

export type SortOption = 'newest' | 'oldest' | 'popular';

interface ReposApiResponse {
  data: Repo[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface RepoApiResponse {
  data: Repo;
}

@Injectable({ providedIn: 'root' })
export class ReposService {
  private readonly t = inject(TranslationService);
  private readonly api = inject(ApiClient);

  private readonly reposSignal = signal<Repo[]>([]);
  private readonly totalPagesSignal = signal(1);
  private readonly totalSignal = signal(0);
  private loaded = false;

  readonly repos = this.reposSignal.asReadonly();
  readonly totalPages = this.totalPagesSignal.asReadonly();
  readonly total = this.totalSignal.asReadonly();

  loadRepos(options: {
    sort?: SortOption;
    page?: number;
    perPage?: number;
  } = {}): void {
    const lang = this.t.lang();
    const params: string[] = [];

    if (options.sort) params.push(`sort=${options.sort}`);
    if (options.page) params.push(`page=${options.page}`);
    if (options.perPage) params.push(`per_page=${options.perPage}`);

    const query = params.length ? `?${params.join('&')}` : '';

    this.api.get<ReposApiResponse>(`${lang}/repos${query}`).subscribe({
      next: (res) => {
        this.reposSignal.set(res.data);
        this.totalPagesSignal.set(res.meta.last_page);
        this.totalSignal.set(res.meta.total);
        this.loaded = true;
      },
      error: () => {
        this.reposSignal.set([]);
        this.loaded = true;
      },
    });
  }

  loadRepoBySlug(slug: string): { repo: () => Repo | undefined } {
    const lang = this.t.lang();
    this._repoDetailSignal.set(undefined);

    this.api.get<RepoApiResponse>(`${lang}/repos/${slug}`).subscribe({
      next: (res) => this._repoDetailSignal.set(res.data),
      error: () => this._repoDetailSignal.set(undefined),
    });

    return { repo: () => this._repoDetailSignal() };
  }

  private readonly _repoDetailSignal = signal<Repo | undefined>(undefined);
  readonly repoDetail = this._repoDetailSignal.asReadonly();

  incrementViewCount(id: number): void {
    this.api.patch<{ viewCount: number }>(`repos/${id}/view`, {}).subscribe();
  }

  // Backward compatibility
  getRepos(): Repo[] {
    if (!this.loaded) {
      this.loadRepos();
    }
    return this.reposSignal();
  }

  getRepoBySlug(slug: string): Repo | undefined {
    const found = this.reposSignal().find(r => r.slug === slug);
    if (found) return found;

    this.loadRepoBySlug(slug);
    return this._repoDetailSignal();
  }

  getSorted(sort: SortOption = 'newest'): Repo[] {
    const repos = [...this.reposSignal()];
    switch (sort) {
      case 'newest':
        return repos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return repos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'popular':
        return repos.sort((a, b) => b.viewCount - a.viewCount);
      default:
        return repos;
    }
  }
}
