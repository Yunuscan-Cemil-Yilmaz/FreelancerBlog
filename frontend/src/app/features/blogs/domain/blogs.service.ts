import { Injectable, inject } from '@angular/core';
import { Blog } from './blogs.models';
import { TranslationService } from '../../../core/config/translation.service';

const DUMMY_BLOGS_EN: Blog[] = [
  {
    id: 1,
    title: 'Getting Started with Angular 21',
    slug: 'getting-started-with-angular-21',
    content: `# Getting Started with Angular 21\n\nAngular 21 introduces a host of new features.\n\n## What's New\n\n- **Signal-based reactivity** is now the default\n- **Standalone components** are the standard\n- **Improved SSR** with better hydration\n\nHappy coding!`,
    excerpt: 'Explore the latest features in Angular 21, including signal-based reactivity and improved SSR capabilities.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1607799279861-4dd421887fc5?w=800&h=400&fit=crop',
    ],
    author: 'Yunuscan Cemil',
    createdAt: '2025-02-15',
    readTime: 5,
    tags: ['Angular', 'TypeScript', 'Web Development'],
    category: 'Frontend',
    subCategory: 'Frameworks',
    viewCount: 1240,
  },
  {
    id: 2,
    title: 'Building REST APIs with Laravel 12',
    slug: 'building-rest-apis-with-laravel-12',
    content: `# Building REST APIs with Laravel 12\n\nLaravel 12 makes API development a breeze.`,
    excerpt: 'Learn how to build powerful REST APIs using Laravel 12 with elegant routing and Eloquent ORM.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&h=400&fit=crop',
    ],
    author: 'Yunuscan Cemil',
    createdAt: '2025-02-10',
    readTime: 7,
    tags: ['Laravel', 'PHP', 'REST API'],
    category: 'Backend',
    subCategory: 'API Development',
    viewCount: 890,
  },
  {
    id: 3,
    title: 'Mastering Tailwind CSS in 2025',
    slug: 'mastering-tailwind-css-2025',
    content: `# Mastering Tailwind CSS in 2025\n\nTailwind CSS v4 brings major improvements.`,
    excerpt: 'Discover the powerful features of Tailwind CSS v4 and how to leverage them in your projects.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    author: 'Yunuscan Cemil',
    createdAt: '2025-01-28',
    readTime: 6,
    tags: ['CSS', 'Tailwind', 'Frontend'],
    category: 'Frontend',
    subCategory: 'Styling',
    viewCount: 2150,
  },
  {
    id: 4,
    title: 'Docker for Full-Stack Developers',
    slug: 'docker-for-full-stack-developers',
    content: `# Docker for Full-Stack Developers\n\nDocker simplifies development workflows.`,
    excerpt: 'Learn how to containerize your full-stack applications with Docker and Docker Compose.',
    imageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
    author: 'Yunuscan Cemil',
    createdAt: '2025-01-15',
    readTime: 8,
    tags: ['Docker', 'DevOps', 'Containers'],
    category: 'DevOps',
    subCategory: 'Containerization',
    viewCount: 3400,
  },
  {
    id: 5,
    title: 'Python Machine Learning Pipeline',
    slug: 'python-ml-pipeline',
    content: `# Python Machine Learning Pipeline\n\nBuild end-to-end ML pipelines with Python.`,
    excerpt: 'Step-by-step guide to creating production-ready machine learning pipelines using Python and PyTorch.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    author: 'Yunuscan Cemil',
    createdAt: '2025-03-01',
    readTime: 12,
    tags: ['Python', 'Machine Learning', 'AI'],
    category: 'AI & Data',
    subCategory: 'Machine Learning',
    viewCount: 5200,
  },
  {
    id: 6,
    title: 'Database Optimization Techniques',
    slug: 'database-optimization-techniques',
    content: `# Database Optimization\n\nOptimize your database queries for maximum performance.`,
    excerpt: 'Advanced techniques for optimizing MySQL and PostgreSQL database queries in production environments.',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
    author: 'Yunuscan Cemil',
    createdAt: '2024-12-20',
    readTime: 10,
    tags: ['MySQL', 'PostgreSQL', 'Performance'],
    category: 'Backend',
    subCategory: 'Database',
    viewCount: 1780,
  },
];

const DUMMY_BLOGS_TR: Blog[] = [
  {
    id: 1,
    title: 'Angular 21 ile Başlangıç',
    slug: 'getting-started-with-angular-21',
    content: `# Angular 21 ile Başlangıç\n\nAngular 21, birçok yeni özellik sunuyor.`,
    excerpt: 'Angular 21\'deki en son özellikleri keşfedin: signal tabanlı reaktivite ve geliştirilmiş SSR.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1607799279861-4dd421887fc5?w=800&h=400&fit=crop',
    ],
    author: 'Yunuscan Cemil',
    createdAt: '2025-02-15',
    readTime: 5,
    tags: ['Angular', 'TypeScript', 'Web Geliştirme'],
    category: 'Frontend',
    subCategory: 'Frameworkler',
    viewCount: 1240,
  },
  {
    id: 2,
    title: 'Laravel 12 ile REST API Geliştirme',
    slug: 'building-rest-apis-with-laravel-12',
    content: `# Laravel 12 ile REST API Geliştirme\n\nLaravel 12 API geliştirmeyi kolaylaştırır.`,
    excerpt: 'Laravel 12 ile güçlü REST API\'lar geliştirmeyi öğrenin.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=800&h=400&fit=crop',
    ],
    author: 'Yunuscan Cemil',
    createdAt: '2025-02-10',
    readTime: 7,
    tags: ['Laravel', 'PHP', 'REST API'],
    category: 'Backend',
    subCategory: 'API Geliştirme',
    viewCount: 890,
  },
  {
    id: 3,
    title: '2025\'te Tailwind CSS\'e Hakim Olmak',
    slug: 'mastering-tailwind-css-2025',
    content: `# 2025'te Tailwind CSS\n\nTailwind CSS v4 büyük iyileştirmeler getiriyor.`,
    excerpt: 'Tailwind CSS v4\'ün güçlü özelliklerini keşfedin.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    author: 'Yunuscan Cemil',
    createdAt: '2025-01-28',
    readTime: 6,
    tags: ['CSS', 'Tailwind', 'Frontend'],
    category: 'Frontend',
    subCategory: 'Stillendirme',
    viewCount: 2150,
  },
  {
    id: 4,
    title: 'Full-Stack Geliştiriciler için Docker',
    slug: 'docker-for-full-stack-developers',
    content: `# Docker\n\nDocker, geliştirme iş akışlarını basitleştirir.`,
    excerpt: 'Docker ve Docker Compose ile uygulamalarınızı konteynerize edin.',
    imageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop',
    author: 'Yunuscan Cemil',
    createdAt: '2025-01-15',
    readTime: 8,
    tags: ['Docker', 'DevOps', 'Konteynerler'],
    category: 'DevOps',
    subCategory: 'Konteynerleştirme',
    viewCount: 3400,
  },
  {
    id: 5,
    title: 'Python Makine Öğrenimi Pipeline\'ı',
    slug: 'python-ml-pipeline',
    content: `# Python ML Pipeline\n\nPython ile uçtan uca ML pipeline\'ları oluşturun.`,
    excerpt: 'Python ve PyTorch kullanarak üretime hazır makine öğrenimi pipeline\'ları oluşturma rehberi.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop',
    author: 'Yunuscan Cemil',
    createdAt: '2025-03-01',
    readTime: 12,
    tags: ['Python', 'Makine Öğrenimi', 'AI'],
    category: 'AI & Veri',
    subCategory: 'Makine Öğrenimi',
    viewCount: 5200,
  },
  {
    id: 6,
    title: 'Veritabanı Optimizasyon Teknikleri',
    slug: 'database-optimization-techniques',
    content: `# Veritabanı Optimizasyonu\n\nVeritabanı sorgularınızı optimize edin.`,
    excerpt: 'Üretim ortamlarında MySQL ve PostgreSQL sorgu optimizasyonu için ileri teknikler.',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=400&fit=crop',
    author: 'Yunuscan Cemil',
    createdAt: '2024-12-20',
    readTime: 10,
    tags: ['MySQL', 'PostgreSQL', 'Performans'],
    category: 'Backend',
    subCategory: 'Veritabanı',
    viewCount: 1780,
  },
];

export type SortOption = 'newest' | 'oldest' | 'popular';

@Injectable({ providedIn: 'root' })
export class BlogsService {
  private readonly t = inject(TranslationService);

  getBlogs(): Blog[] {
    return this.t.isEnglish() ? DUMMY_BLOGS_EN : DUMMY_BLOGS_TR;
  }

  getBlogBySlug(slug: string): Blog | undefined {
    const blogs = this.t.isEnglish() ? DUMMY_BLOGS_EN : DUMMY_BLOGS_TR;
    return blogs.find(b => b.slug === slug);
  }

  getCategories(): string[] {
    const blogs = this.getBlogs();
    return [...new Set(blogs.map(b => b.category))];
  }

  getSubCategories(category?: string): string[] {
    let blogs = this.getBlogs();
    if (category) {
      blogs = blogs.filter(b => b.category === category);
    }
    return [...new Set(blogs.map(b => b.subCategory))];
  }

  getFilteredAndSorted(category?: string, subCategory?: string, sort: SortOption = 'newest'): Blog[] {
    let blogs = [...this.getBlogs()];

    if (category) {
      blogs = blogs.filter(b => b.category === category);
    }
    if (subCategory) {
      blogs = blogs.filter(b => b.subCategory === subCategory);
    }

    switch (sort) {
      case 'newest':
        blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        blogs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        blogs.sort((a, b) => b.viewCount - a.viewCount);
        break;
    }

    return blogs;
  }
}
