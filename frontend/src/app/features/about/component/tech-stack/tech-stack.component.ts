import { Component, inject, signal, effect, untracked } from '@angular/core';
import { TranslationService } from '../../../../core/config/translation.service';
import { ApiClient } from '../../../../core/http/api-client';

export interface TechSkillItem {
  name: string;
  level: string;
}

export interface TechSkillCategory {
  category_en: string;
  category_tr: string;
  items: TechSkillItem[];
}

@Component({
  selector: 'app-tech-stack',
  imports: [],
  templateUrl: './tech-stack.component.html',
})
export class TechStack {
  readonly t = inject(TranslationService);
  private readonly apiClient = inject(ApiClient);

  readonly techSkills = signal<TechSkillCategory[]>([]);

  constructor() {
    effect(() => {
      const lang = this.t.lang();
      untracked(() => {
        this.apiClient.get<{ data: { details: TechSkillCategory }[] }>(`skills/${lang}`).subscribe({
          next: (res) => {
            if (res && res.data) {
              this.techSkills.set(res.data.map(item => item.details));
            }
          },
          error: (err) => {
            console.error('Error fetching tech skills', err);
          }
        });
      });
    });
  }
}
