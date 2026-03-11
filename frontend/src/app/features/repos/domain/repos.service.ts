import { Injectable, inject } from '@angular/core';
import { Repo } from './repos.models';
import { TranslationService } from '../../../core/config/translation.service';

export type SortOption = 'newest' | 'oldest' | 'popular';

const DUMMY_REPOS_EN: Repo[] = [
  {
    id: 1,
    title: 'FreelancerBlog',
    slug: 'freelancer-blog',
    description: `# FreelancerBlog\n\nA full-stack personal blog and portfolio platform built with Angular 21 and Laravel 12.\n\n## Features\n\n- Blog management with markdown support\n- Admin panel with CRUD operations\n- Responsive design with Tailwind CSS\n- RESTful API architecture\n\n## Architecture\n\nThe project follows a clean architecture pattern with:\n- Frontend: Angular 21 + Tailwind CSS + Angular Material\n- Backend: Laravel 12 + MySQL\n- Admin: Separate Angular app`,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    projectUrl: 'https://freelancerblog.dev',
    repoUrl: 'https://github.com/yuncemaz/freelancerblog',
    isPublic: true,
    techStack: ['Angular', 'Laravel', 'MySQL', 'Tailwind CSS'],
    viewCount: 3420,
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=500&fit=crop',
    ],
    createdAt: '2025-02-01',
  },
  {
    id: 2,
    title: 'IScraper',
    slug: 'iscraper',
    description: `# IScraper\n\nAn intelligent web scraping platform with AI-powered data extraction.\n\n## Features\n\n- Configurable scraping pipelines\n- AI-powered content classification\n- Real-time data streaming\n- Dashboard for monitoring jobs`,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    projectUrl: 'https://iscraper.dev',
    isPublic: false,
    techStack: ['Python', 'FastAPI', 'Angular', 'PostgreSQL'],
    viewCount: 1850,
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=500&fit=crop',
    ],
    createdAt: '2025-01-20',
  },
  {
    id: 3,
    title: 'TaskFlow',
    slug: 'taskflow',
    description: `# TaskFlow\n\nA modern task management application with real-time collaboration.\n\n## Features\n\n- Kanban board with drag & drop\n- Real-time updates via WebSockets\n- Team collaboration features\n- Time tracking integration`,
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
    projectUrl: 'https://taskflow.app',
    repoUrl: 'https://github.com/yuncemaz/taskflow',
    isPublic: true,
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    viewCount: 4210,
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop',
    ],
    createdAt: '2024-12-05',
  },
  {
    id: 4,
    title: 'DevMetrics',
    slug: 'devmetrics',
    description: `# DevMetrics\n\nA developer analytics dashboard that aggregates data from multiple sources.\n\n## Features\n\n- GitHub contribution analytics\n- Code quality metrics\n- Performance benchmarking\n- Custom report generation`,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    projectUrl: 'https://devmetrics.io',
    isPublic: false,
    techStack: ['Vue.js', 'Go', 'Redis', 'GraphQL'],
    viewCount: 960,
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    ],
    createdAt: '2024-11-15',
  },
];

const DUMMY_REPOS_TR: Repo[] = [
  {
    id: 1,
    title: 'FreelancerBlog',
    slug: 'freelancer-blog',
    description: `# FreelancerBlog\n\nAngular 21 ve Laravel 12 ile oluşturulmuş full-stack kişisel blog ve portfolyo platformu.\n\n## Özellikler\n\n- Markdown destekli blog yönetimi\n- CRUD işlemleri ile admin paneli\n- Tailwind CSS ile responsive tasarım\n- RESTful API mimarisi`,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    projectUrl: 'https://freelancerblog.dev',
    repoUrl: 'https://github.com/yuncemaz/freelancerblog',
    isPublic: true,
    techStack: ['Angular', 'Laravel', 'MySQL', 'Tailwind CSS'],
    viewCount: 3420,
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=800&h=500&fit=crop',
    ],
    createdAt: '2025-02-01',
  },
  {
    id: 2,
    title: 'IScraper',
    slug: 'iscraper',
    description: `# IScraper\n\nYapay zeka destekli veri çıkarma özelliğine sahip akıllı web kazıma platformu.\n\n## Özellikler\n\n- Yapılandırılabilir kazıma hatları\n- AI destekli içerik sınıflandırma\n- Gerçek zamanlı veri akışı`,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
    projectUrl: 'https://iscraper.dev',
    isPublic: false,
    techStack: ['Python', 'FastAPI', 'Angular', 'PostgreSQL'],
    viewCount: 1850,
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=500&fit=crop',
    ],
    createdAt: '2025-01-20',
  },
  {
    id: 3,
    title: 'TaskFlow',
    slug: 'taskflow',
    description: `# TaskFlow\n\nGerçek zamanlı işbirliği özellikli modern görev yönetim uygulaması.\n\n## Özellikler\n\n- Sürükle & bırak Kanban panosu\n- WebSocket ile gerçek zamanlı güncellemeler\n- Takım işbirliği özellikleri`,
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
    projectUrl: 'https://taskflow.app',
    repoUrl: 'https://github.com/yuncemaz/taskflow',
    isPublic: true,
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    viewCount: 4210,
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop',
    ],
    createdAt: '2024-12-05',
  },
  {
    id: 4,
    title: 'DevMetrics',
    slug: 'devmetrics',
    description: `# DevMetrics\n\nBirden fazla kaynaktan veri toplayan geliştirici analitik panosu.\n\n## Özellikler\n\n- GitHub katkı analitiği\n- Kod kalitesi metrikleri\n- Performans kıyaslama`,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    projectUrl: 'https://devmetrics.io',
    isPublic: false,
    techStack: ['Vue.js', 'Go', 'Redis', 'GraphQL'],
    viewCount: 960,
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    ],
    createdAt: '2024-11-15',
  },
];

@Injectable({ providedIn: 'root' })
export class ReposService {
  private readonly t = inject(TranslationService);

  getRepos(): Repo[] {
    return this.t.isEnglish() ? DUMMY_REPOS_EN : DUMMY_REPOS_TR;
  }

  getRepoBySlug(slug: string): Repo | undefined {
    const repos = this.t.isEnglish() ? DUMMY_REPOS_EN : DUMMY_REPOS_TR;
    return repos.find(r => r.slug === slug);
  }

  getSorted(sort: SortOption = 'newest'): Repo[] {
    const repos = [...this.getRepos()];
    switch (sort) {
      case 'newest':
        return repos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return repos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'popular':
        return repos.sort((a, b) => b.viewCount - a.viewCount);
      default:
        return repos;
    }
  }
}
