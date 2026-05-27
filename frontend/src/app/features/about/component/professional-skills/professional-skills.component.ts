import { Component, inject, OnInit } from '@angular/core';
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
export class ProfessionalSkills implements OnInit {
  readonly t = inject(TranslationService);
  private readonly apiClient = inject(ApiClient);

  professionalSkills: ProfessionalSkillDetails[] = [];

  ngOnInit(): void {
    this.apiClient.get<{ data: any[] }>('professional-skills/en').subscribe({
      next: (res) => {
        if (res && res.data) {
          this.professionalSkills = res.data.map(item => ({
            ...item.details,
            icon: item.icon
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching professional skills', err);
      }
    });
  }
}

