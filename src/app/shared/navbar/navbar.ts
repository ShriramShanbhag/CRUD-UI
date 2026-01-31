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
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  constructor(private auth: AuthService, private router: Router) {
    console.log('Welcome: ', auth.getUserRole());
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
  
    get displayName(): string {
      return this.auth.getUserName() || 'User';
    }

    get role(): string | null {
      return this.auth.getUserRole();
    }
}
