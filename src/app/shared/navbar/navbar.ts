import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar class="app-toolbar" color="primary">
      <span class="brand">CRUD UI</span>
      <span class="spacer"></span>
      <button mat-button (click)="onLogout()">Logout</button>
    </mat-toolbar>
  `,
  styles: [
    `
      .app-toolbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
      }
      .spacer {
        flex: 1 1 auto;
      }
      .brand {
        font-weight: 600;
      }
    `,
  ],
})
export class Navbar {
  constructor(private auth: AuthService, private router: Router) {}

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
