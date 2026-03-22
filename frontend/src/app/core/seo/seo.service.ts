import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);

  update(data: SeoData): void {
    const fullTitle = `${data.title} | Yunuscan Cemil Yılmaz`;
    this.title.setTitle(fullTitle);

    // Standard meta tags
    this.setOrUpdate('description', data.description);
    if (data.author) {
      this.setOrUpdate('author', data.author);
    }

    // Open Graph
    this.setOrUpdateProperty('og:title', data.title);
    this.setOrUpdateProperty('og:description', data.description);
    this.setOrUpdateProperty('og:type', data.type ?? 'article');
    if (data.image) {
      this.setOrUpdateProperty('og:image', data.image);
    }
    if (data.url) {
      this.setOrUpdateProperty('og:url', data.url);
    }

    // Twitter Card
    this.setOrUpdate('twitter:card', 'summary_large_image');
    this.setOrUpdate('twitter:title', data.title);
    this.setOrUpdate('twitter:description', data.description);
    if (data.image) {
      this.setOrUpdate('twitter:image', data.image);
    }

    // Canonical URL
    if (data.url) {
      this.updateCanonical(data.url);
    }
  }

  resetToDefaults(): void {
    this.title.setTitle('Yunuscan Cemil Yılmaz — Developer Portfolio');
    this.meta.removeTag("name='description'");
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
    this.meta.removeTag("property='og:image'");
    this.meta.removeTag("property='og:url'");
    this.meta.removeTag("name='twitter:card'");
    this.meta.removeTag("name='twitter:title'");
    this.meta.removeTag("name='twitter:description'");
    this.meta.removeTag("name='twitter:image'");
  }

  private setOrUpdate(name: string, content: string): void {
    const existing = this.meta.getTag(`name='${name}'`);
    if (existing) {
      this.meta.updateTag({ name, content });
    } else {
      this.meta.addTag({ name, content });
    }
  }

  private setOrUpdateProperty(property: string, content: string): void {
    const existing = this.meta.getTag(`property='${property}'`);
    if (existing) {
      this.meta.updateTag({ property, content });
    } else {
      this.meta.addTag({ property, content });
    }
  }

  private updateCanonical(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (link) {
      link.setAttribute('href', url);
    } else {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
    }
  }
}
