import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../../core/config/translation.service';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.component.html',
})
export class Experience {
  readonly t = inject(TranslationService);

  readonly experiences = [
    {
      year_en: 'Jul 2025 - Present',
      year_tr: 'Tem 2025 - Günümüz',
      role_en: 'Backend Developer Intern',
      role_tr: 'Backend Geliştirici Stajyeri',
      company_en: 'Doğuş Technology',
      company_tr: 'Doğuş Teknoloji',
      description_en:
        'Working on backend services within microservice-based systems. Contributing to system architecture and infrastructure components such as caching, queuing, and logging while improving reliability and maintainability. Also involved in building automation workflows and experimenting with AI-driven tooling.',
      description_tr:
        'Mikroservis tabanlı sistemlerde backend servisleri üzerinde çalışıyorum. Önbellekleme, kuyruklama ve loglama gibi altyapı bileşenleri ile sistem mimarisine katkı sağlayarak uygulamaların güvenilirliğini ve sürdürülebilirliğini artırmaya yönelik çalışmalar yapıyorum. Ayrıca otomasyon workflowları ve yapay zeka destekli araçlar üzerine çalışmalar yürütüyorum.'
    },
    {
      year_en: 'Feb 2025 - Jul 2025',
      year_tr: 'Şub 2025 - Tem 2025',
      role_en: 'Full-Stack Developer',
      role_tr: 'Full-Stack Geliştirici',
      company_en: 'Pratik Information Telecommunications',
      company_tr: 'Pratik Bilişim Telekomünikasyon',
      description_en:
        'Built and maintained production web applications with a strong focus on backend services. Worked on improving system reliability, security, and scalability while implementing features used in real production environments.',
      description_tr:
        'Gerçek üretim ortamlarında çalışan web uygulamaları geliştirdim ve ağırlıklı olarak backend servisleri üzerinde çalıştım. Sistem güvenilirliği, güvenlik ve ölçeklenebilirliği artırmaya yönelik geliştirmeler yaparak uygulamaların üretim ortamındaki kullanımını destekledim.'
    },
    {
      year_en: 'Jun 2024 - Feb 2025',
      year_tr: 'Haz 2024 - Şub 2025',
      role_en: 'Full-Stack Developer Intern',
      role_tr: 'Full-Stack Geliştirici Stajyeri',
      company_en: 'XON Technology',
      company_tr: 'XON Teknoloji',
      description_en:
        'Contributed to full-stack application development across backend and frontend systems. Worked on system design concepts, application reliability, and scalable architectures while participating in real production projects. This period also marked the beginning of my work with AI technologies including prompt engineering, model tuning, and deployment workflows.',
      description_tr:
        'Uygulama sistemlerinin hem backend hem frontend tarafında full-stack geliştirme çalışmalarına katkı sağladım. Sistem tasarımı, uygulama güvenilirliği ve ölçeklenebilir mimariler üzerine çalışarak gerçek projelerde yer aldım. Bu dönemde prompt engineering, model tuning ve model deployment gibi konularla yapay zeka teknolojileri üzerinde çalışmaya başladım.'
    },
    {
      year_en: 'Jan 2024 - Jun 2024',
      year_tr: 'Oca 2024 - Haz 2024',
      role_en: 'Full-Stack Developer',
      role_tr: 'Full-Stack Geliştirici',
      company_en: 'Turkatech Information Technologies',
      company_tr: 'Turkatech Bilişim Teknolojileri',
      description_en:
        'Worked on modern web application development, contributing to API design, backend services, and frontend implementations. Took part in building early production-ready web systems and understanding the fundamentals of application development.',
      description_tr:
        'Modern web uygulamaları geliştirme süreçlerinde görev alarak API geliştirme, backend servisleri ve frontend uygulamaları üzerinde çalıştım. Uygulama geliştirme süreçlerinin temellerini öğrenerek üretim ortamına uygun web sistemlerinin oluşturulmasına katkı sağladım.'
    },
    {
      year_en: 'Feb 2023 - Jan 2024',
      year_tr: 'Şub 2023 - Oca 2024',
      role_en: 'User Support Intern',
      role_tr: 'Kullanıcı Destek Stajyeri',
      company_en: 'Ataturk University Computer Science Application Center',
      company_tr: 'Atatürk Üniversitesi Bilgisayar Bilimleri Uygulama Merkezi',
      description_en:
        'Provided technical support for university laboratories and hardware systems. Worked on device setup, maintenance, and troubleshooting across multiple computer labs.',
      description_tr:
        'Üniversite laboratuvarlarında donanım kurulumu, bakım ve teknik destek süreçlerinde görev aldım. Bilgisayar laboratuvarlarının kurulumu, cihaz arızalarının giderilmesi ve sistemlerin çalışır durumda tutulması üzerine çalıştım.'
    }
  ];
}
