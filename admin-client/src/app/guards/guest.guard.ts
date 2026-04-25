import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const tokenData = authService.getToken();

  if (tokenData && !authService.isTokenExpired(tokenData)) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
