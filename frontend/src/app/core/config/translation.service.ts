import { Injectable, signal, computed } from '@angular/core';
import langEn from './lang_en.json';
import langTr from './lang_tr.json';

export type Lang = 'en' | 'tr';

type TranslationMap = Record<string, string>;

const STORAGE_KEY = 'preferred_lang';

const translations: Record<Lang, TranslationMap> = {
  en: langEn,
  tr: langTr,
};

function isValidLang(val: string | null): val is Lang {
  return val === 'en' || val === 'tr';
}

function resolveInitialLang(): Lang {
  // 1. Check URL query string: ?lang=tr or ?lang=en
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (isValidLang(urlLang)) {
      localStorage.setItem(STORAGE_KEY, urlLang);
      return urlLang;
    }

    // 2. Check localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isValidLang(stored)) {
      return stored;
    }
  }

  // 3. Default
  return 'en';
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly currentLang = signal<Lang>(resolveInitialLang());

  readonly lang = this.currentLang.asReadonly();

  readonly isEnglish = computed(() => this.currentLang() === 'en');

  readonly content = computed<TranslationMap>(() => translations[this.currentLang()]);

  t(key: string): string {
    return this.content()[key] ?? key;
  }

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  toggleLang(): void {
    const next = this.currentLang() === 'en' ? 'tr' : 'en';
    this.setLang(next);
  }
}
