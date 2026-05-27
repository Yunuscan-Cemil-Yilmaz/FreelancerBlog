import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslationService } from '../../../../core/config/translation.service';
import { ToastService } from '../../../../shared/toast/toast.service';
import { ApiClient } from '../../../../core/http/api-client';
import { environment } from '../../../../../environments/environment';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  contactPreference: string;
  preferred_contact_time?: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly t = inject(TranslationService);
  private readonly toast = inject(ToastService);
  private readonly apiClient = inject(ApiClient);
  readonly env = environment;

  readonly showKvkkModal = signal(false);
  readonly kvkkAccepted = signal(false);
  readonly consentAccepted = signal(false);
  readonly submitting = signal(false);

  form: ContactForm = {
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
    this.toast.success(this.t.isEnglish()
      ? 'Privacy notice accepted.'
      : 'Aydınlatma metni kabul edildi.');
  }

  closeKvkkModal(): void {
    this.showKvkkModal.set(false);
  }

  onSubmit(): void {
    const errors = this.validate();
    if (errors.length > 0) {
      errors.forEach(err => this.toast.error(err));
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
      kvkk_approved: this.kvkkAccepted() ? 1 : 0
    };

    const lang = this.t.lang();
    // Assuming backend endpoint is /api/{lang}/interaction-requests or just /api/interaction-requests
    // We'll use the ApiClient post method
    this.apiClient.post(`${lang}/interaction-requests`, payload).subscribe({
      next: () => {
        this.toast.success(this.t.isEnglish()
          ? 'Your message has been sent successfully!'
          : 'Mesajınız başarıyla gönderildi!');
        this.resetForm();
        this.submitting.set(false);
      },
      error: (err) => {
        console.error('Error sending contact form:', err);
        this.toast.error(this.t.isEnglish()
          ? 'An error occurred while sending your message. Please try again.'
          : 'Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
        this.submitting.set(false);
      }
    });
  }

  private validate(): string[] {
    const errors: string[] = [];
    const isEn = this.t.isEnglish();

    if (!this.form.name.trim()) {
      errors.push(isEn ? 'Name is required.' : 'İsim alanı zorunludur.');
    } else if (this.form.name.trim().length < 2) {
      errors.push(isEn ? 'Name must be at least 2 characters.' : 'İsim en az 2 karakter olmalıdır.');
    }

    if (!this.form.contactPreference) {
      errors.push(isEn ? 'Please select a contact preference.' : 'Lütfen bir iletişim tercihi seçin.');
    } else {
      if (this.form.contactPreference === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.form.email.trim())) {
          errors.push(isEn ? 'Please enter a valid email address.' : 'Lütfen geçerli bir e-posta adresi girin.');
        }
      } else {
        const phoneClean = this.form.phone.trim().replace(/[\s\-\(\)]/g, '');
        if (phoneClean.length < 10 || !/^\+?\d+$/.test(phoneClean)) {
          errors.push(isEn ? 'Please enter a valid phone number.' : 'Lütfen geçerli bir telefon numarası girin.');
        }

        if (this.form.contactPreference === 'phone' && !this.form.preferred_contact_time?.trim()) {
          errors.push(isEn ? 'Please select a preferred contact time.' : 'Lütfen tercih edilen bir aranma zamanı seçin.');
        }
      }
    }

    if (!this.form.subject.trim()) {
      errors.push(isEn ? 'Subject is required.' : 'Konu alanı zorunludur.');
    } else if (this.form.subject.trim().length < 3) {
      errors.push(isEn ? 'Subject must be at least 3 characters.' : 'Konu en az 3 karakter olmalıdır.');
    }

    if (!this.form.message.trim()) {
      errors.push(isEn ? 'Message is required.' : 'Mesaj alanı zorunludur.');
    } else if (this.form.message.trim().length < 10) {
      errors.push(isEn ? 'Message must be at least 10 characters.' : 'Mesaj en az 10 karakter olmalıdır.');
    } else if (this.form.message.trim().length > 500) {
      errors.push(isEn ? 'Message must be at maximum 500 characters' : 'Mesaj en fazla 500 karakter olabilir.');
    }

    if (!this.consentAccepted()) {
      errors.push(isEn ? 'Please accept the communication consent.' : 'Lütfen iletişim onayını kabul edin.');
    }

    if (!this.kvkkAccepted()) {
      errors.push(isEn ? 'Please read and accept the privacy notice.' : 'Lütfen aydınlatma metnini okuyup kabul edin.');
    }

    return errors;
  }

  private resetForm(): void {
    this.form = {
      name: '',
      email: '',
      phone: '',
      contactPreference: '',
      preferred_contact_time: '',
      subject: '',
      message: '',
    };
    this.consentAccepted.set(false);
    this.kvkkAccepted.set(false);
  }
}
