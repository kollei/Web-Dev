import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    @if (loading) {
      <p class="muted">Loading album...</p>
    } @else {
      @if (!album) {
        <p class="muted">Album not found.</p>
        <a routerLink="/albums">← Back to Albums</a>
      } @else {
        <h1>Album #{{ album.id }}</h1>
        <p class="muted">User: {{ album.userId }}</p>

        <label class="label">Title</label>
        <input class="input" [(ngModel)]="editTitle" />

        <div class="actions">
          <button (click)="onSave()" [disabled]="saving">
            {{ saving ? 'Saving...' : 'Save' }}
          </button>

          <a class="btn" [routerLink]="['/albums', album.id, 'photos']">View Photos →</a>
          <a class="link" routerLink="/albums">← Back</a>
        </div>

        @if (message) {
          <p class="ok">{{ message }}</p>
        }
      }
    }
  `,
  styles: [`
    h1 { margin: 0 0 6px; }
    .muted { color: #666; margin: 0 0 12px; }

    .label { display: block; margin: 10px 0 6px; font-weight: 600; }
    .input {
      width: 100%;
      max-width: 520px;
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 12px;
      outline: none;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 12px;
      align-items: center;
    }

    button {
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 10px;
      padding: 9px 12px;
      cursor: pointer;
    }
    .btn {
      text-decoration: none;
      padding: 9px 12px;
      border-radius: 10px;
      background: #222;
      color: white;
    }
    .link { text-decoration: none; color: #111; }
    .ok { margin-top: 12px; color: #0a7a2f; }
  `],
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;
  editTitle = '';
  loading = true;
  saving = false;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.albumService.getAlbum(id).subscribe({
      next: (data) => {
        this.album = data;
        this.editTitle = data.title;
        this.loading = false;
      },
      error: () => {
        this.album = null;
        this.loading = false;
      },
    });
  }

  onSave(): void {
    if (!this.album) return;

    this.saving = true;
    this.message = '';

    const updated: Album = { ...this.album, title: this.editTitle };

    this.albumService.updateAlbum(updated).subscribe({
      next: () => {
        this.album = updated;
        this.saving = false;
        this.message = 'Saved locally (JSONPlaceholder simulates update).';
      },
      error: () => {
        this.saving = false;
      },
    });
  }
}