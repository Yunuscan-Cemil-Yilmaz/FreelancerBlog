import { Component, inject, signal, effect, untracked } from '@angular/core';
import { TranslationService } from '../../../../core/config/translation.service';
import { ApiClient } from '../../../../core/http/api-client';

export interface ProfessionalSkillDetails {
  name_en: string;
  name_tr: string;
  icon: string;
  level: string;
}

@Component({
  selector: 'app-professional-skills',
  imports: [],
  templateUrl: './professional-skills.component.html',
})
export class ProfessionalSkills {
  readonly t = inject(TranslationService);
  private readonly apiClient = inject(ApiClient);

  readonly professionalSkills = signal<ProfessionalSkillDetails[]>([]);

  constructor() {
    effect(() => {
      const lang = this.t.lang();
      untracked(() => {
        this.apiClient.get<{ data: any[] }>(`professional-skills/${lang}`).subscribe({
          next: (res) => {
            if (res && res.data) {
              this.professionalSkills.set(res.data.map(item => ({
                ...item.details,
                icon: item.icon
              })));
            }
          },
          error: (err) => {
            console.error('Error fetching professional skills', err);
          }
        });
      });
    });
  }
}
