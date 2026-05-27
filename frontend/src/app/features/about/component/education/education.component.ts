import { Component, inject, OnInit } from '@angular/core';
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
export class Education implements OnInit {
  readonly t = inject(TranslationService);
  private readonly apiClient = inject(ApiClient);

  educations: EducationDetails[] = [];

  ngOnInit(): void {
    this.apiClient.get<{ data: { details: EducationDetails }[] }>('educations/en').subscribe({
      next: (res) => {
        if (res && res.data) {
          this.educations = res.data.map(item => item.details);
        }
      },
      error: (err) => {
        console.error('Error fetching educations', err);
      }
    });
  }
}
