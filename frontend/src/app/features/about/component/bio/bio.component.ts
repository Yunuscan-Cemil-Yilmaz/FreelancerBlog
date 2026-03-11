import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../../core/config/translation.service';

@Component({
  selector: 'app-bio',
  imports: [],
  templateUrl: './bio.component.html',
})

export class Bio {
  readonly t = inject(TranslationService);
}
