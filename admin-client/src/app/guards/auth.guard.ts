import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const tokenData = authService.getToken();

  // 1. Check if token exists
  if (!tokenData) {
    authService.logout();
    return false;
  }

  // 2. Check if token is expired
  if (authService.isTokenExpired(tokenData)) {
    authService.logout();
    return false;
  }

  // 3. Last check: Verify token with backend
  const isValid = await authService.verifyTokenOnBackend();
  if (!isValid) {
    authService.logout();
    return false;
  }

  return true;
};
