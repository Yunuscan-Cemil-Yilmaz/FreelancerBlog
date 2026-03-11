import { Component, inject, signal, computed, effect, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../../../core/config/translation.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly t = inject(TranslationService);
  readonly env = environment;

  private readonly titlesEn = [
    'Building Things That Actually Work',
    'Problem Solver',
    'Turning Ideas into Products',
  ];

  private readonly titlesTr = [
    'Üretimde Kullanılan Sistemler',
    'Sorun Çözümü',
    'Fikirden Ürüne',
  ];

  readonly titles = computed(() => this.t.isEnglish() ? this.titlesEn : this.titlesTr);

  readonly displayText = signal('');
  readonly currentTitleIndex = signal(0);

  private typeTimer: ReturnType<typeof setTimeout> | null = null;
  private isDeleting = false;
  private charIndex = 0;
  private initialized = false;

  constructor() {
    // Watch for language changes and restart typewriter
    effect(() => {
      this.titles(); // subscribe to language changes
      if (this.initialized) {
        // setTimeout breaks out of effect tracking so type() doesn't register signals
        setTimeout(() => this.restartTypewriter(), 0);
      }
    });
  }

  ngOnInit(): void {
    this.initialized = true;
    this.type();
  }

  ngOnDestroy(): void {
    if (this.typeTimer) clearTimeout(this.typeTimer);
  }

  private restartTypewriter(): void {
    if (this.typeTimer) clearTimeout(this.typeTimer);
    this.charIndex = 0;
    this.isDeleting = false;
    this.currentTitleIndex.set(0);
    this.displayText.set('');
    this.type();
  }

  private type(): void {
    const list = this.titles();
    const current = list[this.currentTitleIndex() % list.length];

    if (!this.isDeleting) {
      this.charIndex++;
      this.displayText.set(current.substring(0, this.charIndex));

      if (this.charIndex === current.length) {
        this.typeTimer = setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, 2000);
        return;
      }
      this.typeTimer = setTimeout(() => this.type(), 80);
    } else {
      this.charIndex--;
      this.displayText.set(current.substring(0, this.charIndex));

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.currentTitleIndex.update(i => (i + 1) % list.length);
        this.typeTimer = setTimeout(() => this.type(), 400);
        return;
      }
      this.typeTimer = setTimeout(() => this.type(), 40);
    }
  }
}
