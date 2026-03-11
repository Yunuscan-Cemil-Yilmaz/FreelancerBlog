import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../../core/config/translation.service';

@Component({
  selector: 'app-professional-skills',
  imports: [],
  templateUrl: './professional-skills.component.html',
})
export class ProfessionalSkills {
  readonly t = inject(TranslationService);

  readonly professionalSkills = [
    { name_en: 'System Design Thinking', name_tr: 'Sistem Tasarımı Yaklaşımı', icon: '🧠', level: 'core' },
    { name_en: 'Production Debugging', name_tr: 'Üretimde Sorun Çözme', icon: '🩺', level: 'core' },
    { name_en: 'Performance & Reliability', name_tr: 'Performans & Güvenilirlik', icon: '📈', level: 'strong' },
    { name_en: 'Security Mindset', name_tr: 'Güvenlik Odaklılık', icon: '🛡️', level: 'strong' },
    { name_en: 'API Design & Integration', name_tr: 'API Tasarımı & Entegrasyon', icon: '🔗', level: 'core' },
    { name_en: 'Observability', name_tr: 'Gözlemlenebilirlik', icon: '🔎', level: 'strong' },
    { name_en: 'Automation & Workflows', name_tr: 'Otomasyon & Workflowlar', icon: '⚡', level: 'strong' },
    { name_en: 'Test Strategy', name_tr: 'Test Stratejisi', icon: '🧪', level: 'familiar' },
    { name_en: 'Collaboration & Ownership', name_tr: 'Sahiplenme & Takım Çalışması', icon: '🤝', level: 'core' }
  ];
}
