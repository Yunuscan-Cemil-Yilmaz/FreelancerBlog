import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../../core/config/translation.service';

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.component.html',
})
export class Education {
  readonly t = inject(TranslationService);

    readonly educations = [
    {
      year_en: '2021 - 2025',
      year_tr: '2021 - 2025',
      degree_en: 'B.Sc. Computer Engineering',
      degree_tr: 'Bilgisayar Mühendisliği Lisans',
      school_en: 'Ataturk University',
      school_tr: 'Atatürk Üniversitesi',
      description_en: 'Studied computer engineering with focus on software systems, programming, and computer science fundamentals.',
      description_tr: 'Bilgisayar mühendisliği eğitimi kapsamında yazılım sistemleri, programlama ve bilgisayar bilimi temelleri üzerine eğitim aldım.',
    },
  ];
}
