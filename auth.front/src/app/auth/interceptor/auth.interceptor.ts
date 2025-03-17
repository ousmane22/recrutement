import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let token: string | null = null;
  let clientDomain: string | null = null;

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('auth_token');
    clientDomain = window.location.hostname;
  }

  const clonedRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          ...(clientDomain ? { 'Client-Domain': clientDomain } : {}),
        },
      })
    : req;

  return next(clonedRequest);
};
