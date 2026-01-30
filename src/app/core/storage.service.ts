import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly tokenKey = 'app_token';
  private readonly userKey = 'app_user';

  setToken(token: string | null): void {
    if (token == null) {
      localStorage.removeItem(this.tokenKey);
    } else {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setUser(user: any | null): void {
    if (user == null) {
      localStorage.removeItem(this.userKey);
    } else {
      try {
        localStorage.setItem(this.userKey, JSON.stringify(user));
      } catch {
        // ignore write errors
      }
    }
  }

  getUser(): any | null {
    const raw = localStorage.getItem(this.userKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}
