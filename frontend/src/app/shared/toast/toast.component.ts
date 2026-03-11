import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="pointer-events-auto px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl
                    flex items-start gap-3 animate-slide-in-right cursor-pointer transition-all duration-300
                    hover:scale-[1.02]"
             [class]="getToastClass(toast.type)"
             (click)="toastService.dismiss(toast.id)">
          <span class="text-lg shrink-0 mt-0.5">{{ getIcon(toast.type) }}</span>
          <p class="text-sm font-medium leading-relaxed">{{ toast.message }}</p>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    .animate-slide-in-right {
      animation: slideInRight 0.3s ease-out;
    }
  `],
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);

  getToastClass(type: string): string {
    switch (type) {
      case 'success': return 'bg-green-900/80 border-green-500/30 text-green-100';
      case 'error': return 'bg-red-900/80 border-red-500/30 text-red-100';
      case 'warning': return 'bg-amber-900/80 border-amber-500/30 text-amber-100';
      default: return 'bg-blue-900/80 border-blue-500/30 text-blue-100';
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  }
}
