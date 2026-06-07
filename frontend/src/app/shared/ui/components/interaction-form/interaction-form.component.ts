import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslationService } from '../../../../core/config/translation.service';
import { ToastService } from '../../../toast/toast.service';
import { ApiClient } from '../../../../core/http/api-client';

interface InteractionForm {
  name: string;
  email: string;
  phone: string;
  contactPreference: string;
  preferred_contact_time?: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-interaction-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule],
  styleUrl: './interaction-form.component.scss',
  templateUrl: './interaction-form.component.html'
})
export class InteractionFormComponent {
  readonly t = inject(TranslationService);
  private readonly toast = inject(ToastService);
  private readonly apiClient = inject(ApiClient);

  readonly type = input.required<'blog' | 'repo'>();
  readonly targetId = input.required<number>();
  readonly title = input<string>('Send Interaction Request');

  readonly kvkkAccepted = signal(false);
  readonly consentAccepted = signal(false);
  readonly showKvkkModal = signal(false);
  readonly submitting = signal(false);

  form: InteractionForm = {
    name: '',
    email: '',
    phone: '',
    contactPreference: '',
    preferred_contact_time: '',
    subject: '',
    message: '',
  };

  readonly contactPreferences = [
    { value: 'whatsapp', label_en: 'WhatsApp', label_tr: 'WhatsApp' },
    { value: 'email', label_en: 'Email', label_tr: 'E-posta' },
    { value: 'phone', label_en: 'Phone Call', label_tr: 'Telefon Araması' },
    { value: 'sms', label_en: 'SMS', label_tr: 'SMS' },
  ];

  acceptKvkk(): void {
    this.kvkkAccepted.set(true);
    this.showKvkkModal.set(false);
    this.toast.success(this.t.isEnglish() ? 'Privacy notice accepted.' : 'Aydınlatma metni kabul edildi.');
  }

  closeKvkkModal(): void {
    this.showKvkkModal.set(false);
  }

  onSubmit(): void {
    const isEn = this.t.isEnglish();
    if (!this.form.name.trim() || !this.form.contactPreference || !this.form.message.trim() || !this.kvkkAccepted() || !this.consentAccepted()) {
      this.toast.error(isEn ? 'Please fill in all required fields and accept the agreements.' : 'Lütfen zorunlu alanları doldurun ve izinleri onaylayın.');
      return;
    }

    this.submitting.set(true);

    const payload = {
      name: this.form.name,
      email: this.form.contactPreference === 'email' ? this.form.email : null,
      phone: (this.form.contactPreference === 'phone' || this.form.contactPreference === 'whatsapp' || this.form.contactPreference === 'sms') ? this.form.phone : null,
      interaction_type: this.form.contactPreference,
      preferred_contact_time: this.form.contactPreference === 'phone' ? this.form.preferred_contact_time : null,
      title: this.form.subject,
      message: this.form.message,
      kvkk_approved: 1,
      ...(this.type() === 'blog' ? { blog_id: this.targetId() } : { repo_id: this.targetId() })
    };

    const endpoint = this.type() === 'blog' ? 'blog-interaction-requests' : 'repo-interaction-requests';
    
    this.apiClient.post(`${this.t.lang()}/${endpoint}`, payload).subscribe({
      next: () => {
        this.toast.success(isEn ? 'Your request has been sent successfully!' : 'Talebiniz başarıyla gönderildi!');
        this.form = { name: '', email: '', phone: '', contactPreference: '', preferred_contact_time: '', subject: '', message: '' };
        this.kvkkAccepted.set(false);
        this.consentAccepted.set(false);
        this.submitting.set(false);
      },
      error: () => {
        this.toast.error(isEn ? 'An error occurred.' : 'Bir hata oluştu.');
        this.submitting.set(false);
      }
    });
  }
}
