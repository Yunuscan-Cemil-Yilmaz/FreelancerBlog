import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);
  const router = inject(Router);
  
  // Lazy-load AuthService to prevent circular dependency at startup
  let _authService: AuthService | null = null;
  const getAuthService = () => {
    if (!_authService) {
      _authService = injector.get(AuthService);
    }
    return _authService;
  };

  const STORAGE_KEY = 'moderator_token';
  const data = localStorage.getItem(STORAGE_KEY);

  const logoutAndRedirect = () => {
    getAuthService().logout();
  };

  if (data) {
    try {
      const tokenData = JSON.parse(data);
      
      // 1. Check expiration before sending request
      if (tokenData && tokenData.expired_at) {
        const expiry = new Date(tokenData.expired_at).getTime();
        const now = new Date().getTime();
        
        // Use 5 second buffer
        if (now >= (expiry - 5000)) {
          setTimeout(() => logoutAndRedirect());
          return throwError(() => new Error('Token expired'));
        }
      }

      // 2. Add auth headers
      if (tokenData && tokenData.token) {
        const authReq = req.clone({
          setHeaders: {
            'moderator-id': tokenData.moderator_id.toString(),
            'token': tokenData.token
          }
        });

        return next(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            // 3. Handle unauthorized errors from backend
            if (error.status === 401 || error.status === 403) {
              logoutAndRedirect();
            }
            return throwError(() => error);
          })
        );
      }
    } catch (e) {
      // JSON parse error, ignore and continue
    }
  }

  // Fallback for requests without token or when parsing fails
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        logoutAndRedirect();
      }
      return throwError(() => error);
    })
  );
};
