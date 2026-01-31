import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  template: `
    <app-navbar></app-navbar>
    <main class="app-shell-main"><router-outlet></router-outlet></main>
  `,
  styles: [
    `
      .app-shell-main {
        padding-top: 64px; /* match navbar height */
        box-sizing: border-box;
      }
    `,
  ],
})
export class AppShell {}
