import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../../core/config/translation.service';

@Component({
  selector: 'app-tech-stack',
  imports: [],
  templateUrl: './tech-stack.component.html',
})
export class TechStack {
  readonly t = inject(TranslationService);

  readonly techSkills = [
    {
      category_en: 'Backend Systems',
      category_tr: 'Backend Sistemleri',
      items: [
        { name: '.NET / ASP.NET', level: 'core' },
        { name: 'PHP / Laravel', level: 'core' },
        { name: 'Node.js / Express', level: 'strong' },
        { name: 'Python / Django', level: 'strong' },
        { name: 'REST API Design', level: 'core' }
      ]
    },
    {
      category_en: 'Frontend Development',
      category_tr: 'Frontend Geliştirme',
      items: [
        { name: 'Angular', level: 'strong' },
        { name: 'React / Vite', level: 'familiar' },
        { name: 'HTML / CSS / JavaScript', level: 'core' },
        { name: 'Tailwind CSS', level: 'strong' },
        { name: 'SCSS / Sass', level: 'strong' }
      ]
    },
    {
      category_en: 'Data Storage',
      category_tr: 'Veri Depolama',
      items: [
        { name: 'MySQL', level: 'core' },
        { name: 'PostgreSQL', level: 'strong' },
        { name: 'SQL Server', level: 'strong' },
        { name: 'MongoDB', level: 'familiar' },
        { name: 'Eloquent ORM', level: 'core' },
        { name: 'EF Core', level: 'core' }
      ]
    },
    {
      category_en: 'Messaging & Event Systems',
      category_tr: 'Mesajlaşma & Event Sistemleri',
      items: [
        { name: 'RabbitMQ', level: 'strong' },
        { name: 'Redis Pub/Sub', level: 'familiar' }
      ]
    },
    {
      category_en: 'Caching',
      category_tr: 'Önbellekleme',
      items: [
        { name: 'Redis', level: 'strong' }
      ]
    },
    {
      category_en: 'Search & Data Processing',
      category_tr: 'Arama & Veri İşleme',
      items: [
        { name: 'Elasticsearch', level: 'strong' }
      ]
    },
    {
      category_en: 'Infrastructure & DevOps',
      category_tr: 'Altyapı & DevOps',
      items: [
        { name: 'Docker', level: 'strong' },
        { name: 'Linux', level: 'core' },
        { name: 'Nginx', level: 'strong' },
        { name: 'CI/CD Pipelines', level: 'strong' },
        { name: 'Git / GitHub', level: 'core' }
      ]
    },
    {
      category_en: 'AI & Automation',
      category_tr: 'AI & Otomasyon',
      items: [
        { name: 'Prompt Engineering', level: 'strong' },
        { name: 'PyTorch', level: 'familiar' },
        { name: 'NumPy / Pandas', level: 'familiar' },
        { name: 'YOLO', level: 'familiar' },
        { name: 'n8n Workflow Automation', level: 'strong' }
      ]
    },
    {
      category_en: 'Languages',
      category_tr: 'Programlama Dilleri',
      items: [
        { name: 'C#', level: 'core' },
        { name: 'TypeScript', level: 'core' },
        { name: 'JavaScript', level: 'core' },
        { name: 'PHP', level: 'core' },
        { name: 'Python', level: 'strong' },
        { name: 'SQL', level: 'core' }
      ]
    }
  ];
}
