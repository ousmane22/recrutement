import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  const clientDomain = window.location.hostname;

  const clonedRequest = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Client-Domain': clientDomain,
      },
    })
    : req;

  return next(clonedRequest);
};
