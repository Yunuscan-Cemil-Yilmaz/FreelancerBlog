import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export interface AuthToken {
  token: string;
  expired_at: string; // ISO string
  moderator_id: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'moderator_token';
  private readonly API_URL = 'http://localhost:8000/api';
  
  currentUser = signal<any>(null);

  constructor(private router: Router, private http: HttpClient) {
    this.checkInitialAuth();
  }

  private checkInitialAuth() {
    const tokenData = this.getToken();
    if (tokenData && !this.isTokenExpired(tokenData)) {
      this.currentUser.set({ 
        token: tokenData.token,
        moderator_id: tokenData.moderator_id
      });
    } else if (tokenData) {
      this.logout();
    }
  }

  getToken(): AuthToken | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  setToken(token: string, expiredAt: string, moderatorId: string | number) {
    const data: AuthToken = { token, expired_at: expiredAt, moderator_id: moderatorId };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    this.currentUser.set({ token, moderator_id: moderatorId });
  }

  isTokenExpired(tokenData: AuthToken): boolean {
    if (!tokenData.expired_at) return true;
    const expiry = new Date(tokenData.expired_at).getTime();
    const now = new Date().getTime();
    return now >= (expiry - 5000);
  }

  async login(username: string, password: string): Promise<any> {
    const response = await lastValueFrom(
      this.http.post<any>(`${this.API_URL}/moderator/login`, { username, password })
    );
    
    if (response && response.token) {
      this.setToken(response.token, response.expiresAt, response.moderator.id);
    }
    return response;
  }

  async verifyTokenOnBackend(): Promise<boolean> {
    const tokenData = this.getToken();
    if (!tokenData) return false;

    const headers = new HttpHeaders({
      'moderator-id': tokenData.moderator_id.toString(),
      'token': tokenData.token
    });

    try {
      await lastValueFrom(
        this.http.get<any>(`${this.API_URL}/moderator/oauth`, { headers })
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
}
