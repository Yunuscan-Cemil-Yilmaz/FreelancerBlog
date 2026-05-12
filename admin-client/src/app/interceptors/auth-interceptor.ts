import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const STORAGE_KEY = 'admin_token';
  const data = localStorage.getItem(STORAGE_KEY);

  if (data) {
    try {
      const tokenData = JSON.parse(data);
      if (tokenData && tokenData.token) {
        const authReq = req.clone({
          setHeaders: {
            'admin-id': tokenData.admin_id.toString(),
            'token': tokenData.token
          }
        });
        return next(authReq);
      }
    } catch (e) {
      // If parsing fails, just continue with original request
    }
  }

  return next(req);
};
