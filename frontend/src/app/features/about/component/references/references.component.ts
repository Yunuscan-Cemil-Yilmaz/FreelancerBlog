import { Component, HostListener, inject, OnDestroy, PLATFORM_ID, signal, effect, untracked } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../../../core/config/translation.service';
import { ApiClient } from '../../../../core/http/api-client';

export interface ReferenceDetails {
  name: string;
  company: string;
  role_en: string;
  role_tr: string;
  quote_en: string;
  quote_tr: string;
}

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references.component.html',
})
export class References implements OnDestroy {
  readonly t = inject(TranslationService);
  private readonly apiClient = inject(ApiClient);

  readonly references = signal<ReferenceDetails[]>([]);
  readonly currentRefIndex = signal(0);
  private autoSlideInterval: ReturnType<typeof setInterval> | null = null;
  readonly isPaused = signal(false);

  private readonly platformId = inject(PLATFORM_ID);

  visibleCount: number = 3;

  constructor() {
    this.updateVisibleCount();
    effect(() => {
      const lang = this.t.lang();
      untracked(() => {
        this.apiClient.get<{ data: { details: ReferenceDetails }[] }>(`references/${lang}`).subscribe({
          next: (res) => {
            if (res && res.data) {
              this.references.set(res.data.map(item => item.details));
              if (this.references().length > 0) {
                this.startAutoSlide();
              }
            }
          },
          error: (err) => {
            console.error('Error fetching references', err);
          }
        });
      });
    });
  }

  get slideWidth(): number {
    return 100 / this.visibleCount;
  }

  get slideOffset(): number {
    const active = this.currentRefIndex();
    const maxOffset = Math.max(this.references().length - this.visibleCount, 0);
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

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.stopAutoSlide();
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
    this.currentRefIndex.update(i => (i + 1) % this.references().length);
  }

  prevRef(): void {
    this.currentRefIndex.update(i => (i - 1 + this.references().length) % this.references().length);
  }

  goToRef(index: number): void {
    this.currentRefIndex.set(index);
  }
}
