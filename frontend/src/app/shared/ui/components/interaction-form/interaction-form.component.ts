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
  template: `
    <div class="mt-12 p-6 rounded-xl border border-white/5 bg-white/[0.02]">
      <h3 class="text-xl font-bold mb-6 text-white">{{ title() }}</h3>
      <form (ngSubmit)="onSubmit()" class="space-y-4">
        <!-- Name -->
        <mat-form-field appearance="outline" class="w-full custom-field">
          <mat-label>{{ t.t('contact.name') }}</mat-label>
          <input matInput [(ngModel)]="form.name" name="name" />
        </mat-form-field>

        <!-- Preference -->
        <mat-form-field appearance="outline" class="w-full custom-field">
          <mat-label>{{ t.t('contact.preference') }}</mat-label>
          <mat-select [(ngModel)]="form.contactPreference" name="contactPreference">
            @for (pref of contactPreferences; track pref.value) {
              <mat-option [value]="pref.value">
                {{ t.isEnglish() ? pref.label_en : pref.label_tr }}
              </mat-option>
            }
          </mat-select>
        </mat-form-field>

        @if (form.contactPreference === 'email') {
          <mat-form-field appearance="outline" class="w-full custom-field">
            <mat-label>{{ t.t('contact.email') }}</mat-label>
            <input matInput [(ngModel)]="form.email" name="email" type="email" />
          </mat-form-field>
        } @else if (form.contactPreference === 'phone' || form.contactPreference === 'whatsapp' || form.contactPreference === 'sms') {
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <mat-form-field appearance="outline" class="w-full custom-field" [class.sm:col-span-2]="form.contactPreference !== 'phone'">
              <mat-label>{{ t.t('contact.phone') }}</mat-label>
              <input matInput [(ngModel)]="form.phone" name="phone" type="tel" />
            </mat-form-field>
            @if (form.contactPreference === 'phone') {
              <mat-form-field appearance="outline" class="w-full custom-field">
                <mat-label>{{ t.isEnglish() ? 'Preferred Contact Time' : 'Tercih Edilen Aranma Zamanı' }}</mat-label>
                <input matInput [(ngModel)]="form.preferred_contact_time" name="preferred_contact_time" type="datetime-local" />
              </mat-form-field>
            }
          </div>
        }

        <!-- Subject -->
        <mat-form-field appearance="outline" class="w-full custom-field">
          <mat-label>{{ t.isEnglish() ? 'Subject' : 'Konu' }}</mat-label>
          <input matInput [(ngModel)]="form.subject" name="subject" />
        </mat-form-field>

        <!-- Message -->
        <mat-form-field appearance="outline" class="w-full custom-field">
          <mat-label>{{ t.t('contact.message') }}</mat-label>
          <textarea matInput [(ngModel)]="form.message" name="message" rows="3"></textarea>
        </mat-form-field>

        <!-- Consent Checkboxes -->
        <div class="space-y-4 pt-2 pb-4">
          <!-- Checkbox 1: Communication Consent -->
          <div class="flex items-start gap-3">
            <mat-checkbox [checked]="consentAccepted()" (change)="consentAccepted.set(!consentAccepted())" name="consent" class="mt-0.5 custom-checkbox"></mat-checkbox>
            <p class="text-xs text-slate-400 leading-relaxed">
              {{ t.t('contact.consent_text') }}
            </p>
          </div>

          <!-- Checkbox 2: KVKK -->
          <div class="flex items-start gap-3">
            <mat-checkbox [checked]="kvkkAccepted()" (change)="kvkkAccepted.set(!kvkkAccepted())" name="kvkk" class="mt-0.5 custom-checkbox"></mat-checkbox>
            <p class="text-xs text-slate-400 leading-relaxed">
              {{ t.t('contact.kvkk_text_before') }}
              <button type="button" (click)="showKvkkModal.set(true)"
                      class="text-blue-400 underline hover:text-blue-300 transition-colors cursor-pointer">
                {{ t.t('contact.kvkk_link') }}
              </button>
              {{ t.t('contact.kvkk_text_after') }}
            </p>
          </div>
        </div>

        <!-- Submit -->
        <button mat-flat-button type="submit" [disabled]="submitting()"
                class="w-full !bg-gradient-to-r !from-blue-600 !to-violet-600 !text-white !py-2 !rounded-xl
                       !font-semibold hover:!from-blue-500 hover:!to-violet-500 transition-all disabled:!opacity-50">
          {{ submitting() ? t.t('contact.sending') : t.t('contact.send') }}
        </button>
      </form>
    </div>

    <!-- KVKK Modal -->
    @if (showKvkkModal()) {
      <div class="fixed inset-0 z-[9998] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" (click)="closeKvkkModal()"></div>
        <div class="relative w-full max-w-2xl bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div class="flex items-center justify-between p-6 border-b border-white/5">
            <h3 class="text-lg font-bold text-white">{{ t.t('contact.kvkk_modal_title') }}</h3>
            <button (click)="closeKvkkModal()" class="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center cursor-pointer">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="p-6 max-h-[60vh] overflow-y-auto text-sm text-slate-300 leading-relaxed space-y-4 kvkk-scroll">
            <h4 class="text-base font-semibold text-white">1. {{ t.t('contact.kvkk_s1_title') }}</h4>
            <p>{{ t.t('contact.kvkk_s1_body') }}</p>
            <h4 class="text-base font-semibold text-white">2. {{ t.t('contact.kvkk_s2_title') }}</h4>
            <p>{{ t.t('contact.kvkk_s2_body') }}</p>
            <h4 class="text-base font-semibold text-white">3. {{ t.t('contact.kvkk_s3_title') }}</h4>
            <p>{{ t.t('contact.kvkk_s3_body') }}</p>
            <h4 class="text-base font-semibold text-white">4. {{ t.t('contact.kvkk_s4_title') }}</h4>
            <p>{{ t.t('contact.kvkk_s4_body') }}</p>
          </div>
          <div class="p-6 border-t border-white/5 flex items-center justify-end gap-3">
            <button (click)="closeKvkkModal()" class="px-5 py-2.5 text-sm font-medium rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-all cursor-pointer">{{ t.t('contact.kvkk_close') }}</button>
            <button (click)="acceptKvkk()" class="px-5 py-2.5 text-sm font-medium rounded-xl transition-all cursor-pointer bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-violet-500">{{ t.t('contact.kvkk_accept') }}</button>
          </div>
        </div>
      </div>
    }
  `
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
