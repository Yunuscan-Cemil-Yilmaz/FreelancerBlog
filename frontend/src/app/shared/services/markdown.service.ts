import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Injectable({ providedIn: 'root' })
export class MarkdownService {
  private readonly platformId = inject(PLATFORM_ID);

  async render(markdown: string): Promise<string> {
    if (!markdown) return '';
    const rawHtml = await marked.parse(markdown);
    if (isPlatformBrowser(this.platformId)) {
      return DOMPurify.sanitize(rawHtml);
    }
    // On server-side, return the raw parsed HTML (no DOM available for DOMPurify)
    return rawHtml;
  }
}
