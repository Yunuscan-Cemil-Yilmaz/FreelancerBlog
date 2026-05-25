import { Component, inject, OnInit } from '@angular/core';
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
export class Experience implements OnInit {
  readonly t = inject(TranslationService);
  private readonly apiClient = inject(ApiClient);

  experiences: ExperienceDetails[] = [];

  ngOnInit(): void {
    this.apiClient.get<{ data: { details: ExperienceDetails }[] }>('experiences/en').subscribe({
      next: (res) => {
        if (res && res.data) {
          this.experiences = res.data.map(item => item.details);
        }
      },
      error: (err) => {
        console.error('Error fetching experiences', err);
      }
    });
  }
}

