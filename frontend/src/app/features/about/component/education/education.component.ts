import { Component, inject, signal, effect, untracked } from '@angular/core';
import { TranslationService } from '../../../../core/config/translation.service';
import { ApiClient } from '../../../../core/http/api-client';

export interface EducationDetails {
  year_en: string;
  year_tr: string;
  degree_en: string;
  degree_tr: string;
  school_en: string;
  school_tr: string;
  description_en: string;
  description_tr: string;
}

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.component.html',
})
export class Education {
  readonly t = inject(TranslationService);
  private readonly apiClient = inject(ApiClient);

  readonly educations = signal<EducationDetails[]>([]);

  constructor() {
    effect(() => {
      const lang = this.t.lang();
      untracked(() => {
        this.apiClient.get<{ data: { details: EducationDetails }[] }>(`educations/${lang}`).subscribe({
          next: (res) => {
            if (res && res.data) {
              this.educations.set(res.data.map(item => item.details));
            }
          },
          error: (err) => {
            console.error('Error fetching educations', err);
          }
        });
      });
    });
  }
}
