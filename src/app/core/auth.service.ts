import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

export interface User {
  id?: string | number;
  name?: string;
  email: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser = signal<User | null>(null);
  private _token = signal<string | null>(null);
  private _loggedIn = signal<boolean>(false);

  readonly currentUser = this._currentUser.asReadonly();
  readonly token = this._token.asReadonly();
  readonly loggedIn = this._loggedIn.asReadonly();

  constructor(private http: HttpClient, private storage: StorageService) {
    const token = this.storage.getToken();
    this._token.set(token ?? null);
    const storedUser = this.storage.getUser();
    this._currentUser.set((storedUser as User) ?? null);
    this._loggedIn.set(!!token);
  }

  login(email: string, password: string): Observable<{ user: User; token: string }> {
    const url = `${environment.apiBaseUrl}${environment.endpoints.login}`;
    return this.http.post<{ user: User; token: string }>(url, { email, password }).pipe(
      tap((res) => {
        this._token.set(res.token ?? null);
        this._currentUser.set(res.user ?? null);
        this._loggedIn.set(true);
        this.storage.setToken(res.token ?? null);
        this.storage.setUser(res.user ?? null);
      })
    );
  }

  register(email: string, name: string, password: string): Observable<{ user: User; token: string }> {
    const url = `${environment.apiBaseUrl}${environment.endpoints.register}`;
    return this.http.post<{ user: User; token: string }>(url, { email, name, password }).pipe(
      tap((res) => {
        this._token.set(res.token ?? null);
        this._currentUser.set(res.user ?? null);
        this.storage.setToken(res.token ?? null);
        this.storage.setUser(res.user ?? null);
      })
    );
  }

  getUserRole(): string | null {
    const user = this._currentUser();
    // Assuming user object has a 'role' property
    return (user && (user as User).role) ?? null;
  }

  logout(): void {
    this._token.set(null);
    this._currentUser.set(null);
    this._loggedIn.set(false);
    this.storage.clear();
  }
}
