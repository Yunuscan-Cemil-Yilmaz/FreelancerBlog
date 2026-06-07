import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
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
