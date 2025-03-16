import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/login-response.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const loginData = {
      email: email,
      password: password,
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginData);
  }


  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);

    const expiration = new Date().getTime() + 2 * 60 * 60 * 1000;
    localStorage.setItem('token_expiration', expiration.toString());
  }

  storeTenant(tenant: string): void {
    localStorage.setItem('tenant_id', tenant);
  }

  getToken(): string | null {
    const token = localStorage.getItem('auth_token');
    const expiration = localStorage.getItem('token_expiration');

    if (token && expiration) {
      const currentTime = new Date().getTime();

      if (currentTime > Number(expiration)) {
        this.logout();
        return null;
      }

      return token;
    }

    return null;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token_expiration');
    localStorage.removeItem('tenant_id');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/forgot-password`, { email });
  }

  resetPassword(data: { email: string, token: string, password: string, password_confirmation: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/reset-password`, data);
  }
}
