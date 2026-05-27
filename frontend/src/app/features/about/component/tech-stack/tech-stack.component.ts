import { Component, inject, OnInit } from '@angular/core';
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
export class TechStack implements OnInit {
  readonly t = inject(TranslationService);
  private readonly apiClient = inject(ApiClient);

  techSkills: TechSkillCategory[] = [];

  ngOnInit(): void {
    this.apiClient.get<{ data: { details: TechSkillCategory }[] }>('skills/en').subscribe({
      next: (res) => {
        if (res && res.data) {
          this.techSkills = res.data.map(item => item.details);
        }
      },
      error: (err) => {
        console.error('Error fetching tech skills', err);
      }
    });
  }
}
