import { Component, HostListener, inject, OnInit, OnDestroy,PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../../../core/config/translation.service';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references.component.html',
})
export class References implements OnInit, OnDestroy {
  readonly t = inject(TranslationService);

    readonly references = [
    {
      name: 'John Doe',
      role_en: 'Senior Software Engineer',
      role_tr: 'Kıdemli Yazılım Mühendisi',
      company: 'Tech Corp',
      quote_en: 'Yunuscan is a talented developer who consistently delivers high-quality work. His ability to quickly learn new technologies is impressive.',
      quote_tr: 'Yunuscan, sürekli olarak yüksek kaliteli iş üreten yetenekli bir geliştirici. Yeni teknolojileri hızla öğrenme yeteneği etkileyici.',
    },
    {
      name: 'Jane Smith',
      role_en: 'Project Manager',
      role_tr: 'Proje Yöneticisi',
      company: 'StartupXYZ',
      quote_en: 'Working with Yunuscan was a great experience. He brings both technical expertise and excellent communication skills to every project.',
      quote_tr: 'Yunuscan ile çalışmak harika bir deneyimdi. Her projeye hem teknik uzmanlık hem de mükemmel iletişim becerileri getiriyor.',
    },
    {
      name: 'Ahmet Yılmaz',
      role_en: 'CTO',
      role_tr: 'CTO',
      company: 'Digital Agency',
      quote_en: 'One of the most dedicated developers I have worked with. His problem-solving skills and attention to detail are exceptional.',
      quote_tr: 'Birlikte çalıştığım en özverili geliştiricilerden biri. Problem çözme becerileri ve detaylara gösterdiği özen olağanüstü.',
    },
    {
      name: 'Emily Chen',
      role_en: 'Lead Designer',
      role_tr: 'Baş Tasarımcı',
      company: 'Creative Studio',
      quote_en: 'Yunuscan bridges the gap between design and development perfectly. He turns pixel-perfect designs into flawless implementations.',
      quote_tr: 'Yunuscan, tasarım ve geliştirme arasındaki boşluğu mükemmel bir şekilde kapatıyor. Piksel-mükemmel tasarımları kusursuz uygulamalara dönüştürüyor.',
    },
    {
      name: 'Mehmet Kaya',
      role_en: 'Product Owner',
      role_tr: 'Ürün Sahibi',
      company: 'FinTech Solutions',
      quote_en: 'Highly reliable and proactive. Yunuscan anticipates problems before they happen and always delivers on time.',
      quote_tr: 'Son derece güvenilir ve proaktif. Yunuscan sorunları oluşmadan önce öngörüyor ve her zaman zamanında teslim ediyor.',
    },
  ];

  // slider
  readonly currentRefIndex = signal(0);
  private autoSlideInterval: ReturnType <typeof setInterval> | null = null;
  readonly isPaused = signal(false);

  private readonly platformId = inject(PLATFORM_ID);

  visibleCount: number = 3;

  get slideWidth(): number {
    return 100 / this.visibleCount;
  }

  get slideOffset(): number {
    const active = this.currentRefIndex();
    const maxOffset = Math.max(this.references.length - this.visibleCount, 0);
    // Try to center: for 3 visible use active-1, for 2 use active-0.5 floored, for 1 use active
    let offset: number;
    if (this.visibleCount >= 3) {
      offset = active - 1;
    } else if (this.visibleCount === 2) {
      offset = active - 1;
    } else {
      offset = active;
    }
    offset = Math.min(Math.max(offset, 0), maxOffset);
    return offset * this.slideWidth;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateVisibleCount();
  }

  private updateVisibleCount(): void {
    if (isPlatformBrowser(this.platformId)) {
      const w = window.innerWidth;
      if (w >= 1024) {
        this.visibleCount = 3;
      } else if (w >= 640) {
        this.visibleCount = 2;
      } else {
        this.visibleCount = 1;
      }
    }
  }

  isHighlighted(i: number): boolean {
    return i === this.currentRefIndex();
  }

  ngOnInit(): void {
    this.updateVisibleCount();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      if (!this.isPaused()) {
        this.nextRef();
      }
    }, 4000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  pauseSlide(): void {
    this.isPaused.set(true);
  }

  resumeSlide(): void {
    this.isPaused.set(false);
  }

  nextRef(): void {
    this.currentRefIndex.update(i => (i + 1) % this.references.length);
  }

  prevRef(): void {
    this.currentRefIndex.update(i => (i - 1 + this.references.length) % this.references.length);
  }

  goToRef(index: number): void {
    this.currentRefIndex.set(index);
  }
}
