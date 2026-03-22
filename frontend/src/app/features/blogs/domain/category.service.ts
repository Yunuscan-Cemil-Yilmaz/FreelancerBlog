import { Injectable, inject, signal } from '@angular/core';
import { ApiClient } from '../../../core/http/api-client';
import { TranslationService } from '../../../core/config/translation.service';
import { Category } from './category.models';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly api = inject(ApiClient);
  private readonly t = inject(TranslationService);
  private readonly categoriesSignal = signal<Category[]>([]);

  readonly categories = this.categoriesSignal.asReadonly();

  loadCategories(): void {
    const lang = this.t.lang();
    this.api.get<{ data: Category[] }>(`${lang}/categories`).subscribe({
      next: (res) => this.categoriesSignal.set(res.data),
      error: () => this.categoriesSignal.set([]),
    });
  }
}
