import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Album Browser</h1>
    <p>Simple app: Router + HTTP + Services. Data from JSONPlaceholder.</p>

    <a class="btn" routerLink="/albums">Browse Albums →</a>
  `,
  styles: [`
    h1 { margin: 0 0 8px; }
    p { margin: 0 0 16px; color: #444; }
    .btn {
      display: inline-block;
      padding: 10px 14px;
      border-radius: 10px;
      background: #222;
      color: white;
      text-decoration: none;
    }
  `],
})
export class HomeComponent {}