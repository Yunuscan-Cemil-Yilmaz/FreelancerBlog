import {
  Component, inject, input, output, viewChild, ElementRef,
  afterNextRender, OnDestroy, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

@Component({
  selector: 'app-gallery-carousel',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './gallery-carousel.component.html',
  styleUrl: './gallery-carousel.component.scss',
})
export class GalleryCarouselComponent implements OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  readonly images = input.required<string[]>();
  readonly title = input<string>('Gallery');
  readonly autoplayDelay = input<number>(10000);

  readonly imageClick = output<string>();

  readonly swiperEl = viewChild<ElementRef>('swiperEl');

  activeSlideIndex = 0;
  needsCarousel = false;
  private pollInterval: any = null;

  constructor() {
    afterNextRender(() => {
      setTimeout(() => this.init(), 100);
    });
  }

  ngOnDestroy(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  }

  private getMaxVisibleSlides(): number {
    if (typeof window === 'undefined') return 3;
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  }

  private init(): void {
    const count = this.images().length;
    if (count === 0) return;

    const maxVisible = this.getMaxVisibleSlides();
    this.needsCarousel = count > maxVisible;
    this.cdr.markForCheck();
    this.cdr.detectChanges();

    if (this.needsCarousel) {
      this.initSwiper();
    }
  }

  private initSwiper(): void {
    const el = this.swiperEl()?.nativeElement;
    if (!el) return;

    Object.assign(el, {
      slidesPerView: 1,
      spaceBetween: 12,
      loop: true,
      speed: 400,
      grabCursor: true,
      keyboard: { enabled: true },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 12 },
        1024: { slidesPerView: 3, spaceBetween: 16 },
      },
      autoplay: {
        delay: this.autoplayDelay(),
        disableOnInteraction: false,
      },
    });

    el.initialize();

    this.pollInterval = setInterval(() => {
      const idx = el.swiper?.realIndex ?? 0;
      if (idx !== this.activeSlideIndex) {
        this.activeSlideIndex = idx;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }
    }, 300);
  }

  slidePrev(): void {
    this.swiperEl()?.nativeElement?.swiper?.slidePrev();
  }

  slideNext(): void {
    this.swiperEl()?.nativeElement?.swiper?.slideNext();
  }

  onImageClick(imageUrl: string): void {
    this.imageClick.emit(imageUrl);
  }
}
