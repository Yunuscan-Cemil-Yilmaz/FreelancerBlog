import { Component, inject, input } from '@angular/core';
import { TranslationService } from '../../../../core/config/translation.service';

@Component({
  selector: 'app-blog-header',
  imports: [],
  templateUrl: './blog-header.component.html',
})
export class BlogHeader {
  readonly title = input.required<string>();
  readonly tags = input.required<string[]>();
  readonly createdAt = input.required<string>();
  readonly readTime = input.required<number>();
  readonly imageUrl = input.required<string>();
  readonly imageAlt = input.required<string>();

  readonly t = inject(TranslationService);
}
