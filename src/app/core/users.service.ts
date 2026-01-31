import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    const url = `${environment.apiBaseUrl}${environment.endpoints.users}`;
    return this.http.get<User[]>(url);
  }
}
