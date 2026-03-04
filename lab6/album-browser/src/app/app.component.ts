import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="nav">
      <a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
      <a routerLink="/about" routerLinkActive="active">About</a>
      <a routerLink="/albums" routerLinkActive="active">Albums</a>
    </nav>

    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .nav {
      display: flex;
      gap: 14px;
      padding: 12px 16px;
      border-bottom: 1px solid #e5e5e5;
      position: sticky;
      top: 0;
      background: white;
    }
    .nav a {
      text-decoration: none;
      color: #222;
      padding: 6px 10px;
      border-radius: 8px;
    }
    .nav a.active {
      background: #f2f2f2;
      font-weight: 600;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 16px;
    }
  `],
})
export class AppComponent {}