import { Component, inject, signal, effect, untracked } from '@angular/core';
import { TranslationService } from '../../../../core/config/translation.service';
import { ApiClient } from '../../../../core/http/api-client';

export interface ExperienceDetails {
  year_en: string;
  year_tr: string;
  role_en: string;
  role_tr: string;
  company_en: string;
  company_tr: string;
  description_en: string;
  description_tr: string;
}

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.component.html',
})
export class Experience {
  readonly t = inject(TranslationService);
  private readonly apiClient = inject(ApiClient);

  readonly experiences = signal<ExperienceDetails[]>([]);

  constructor() {
    effect(() => {
      const lang = this.t.lang();
      untracked(() => {
        this.apiClient.get<{ data: { details: ExperienceDetails }[] }>(`experiences/${lang}`).subscribe({
          next: (res) => {
            if (res && res.data) {
              this.experiences.set(res.data.map(item => item.details));
            }
          },
          error: (err) => {
            console.error('Error fetching experiences', err);
          }
        });
      });
    });
  }
}

