import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Albums</h1>

    @if (loading) {
      <p class="muted">Loading albums...</p>
    } @else {
      @if (albums.length === 0) {
        <p class="muted">No albums.</p>
      } @else {
        <div class="list">
          @for (a of albums; track a.id) {
            <div class="item">
              <a class="title" [routerLink]="['/albums', a.id]">
                <span class="id">#{{ a.id }}</span> {{ a.title }}
              </a>

              <button class="danger" (click)="onDelete(a.id)">Delete</button>
            </div>
          }
        </div>
      }
    }
  `,
  styles: [`
    h1 { margin: 0 0 12px; }
    .muted { color: #666; }

    .list { display: flex; flex-direction: column; gap: 10px; }
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 12px;
      border: 1px solid #e7e7e7;
      border-radius: 12px;
    }
    .title {
      text-decoration: none;
      color: #111;
      flex: 1;
    }
    .id { color: #777; margin-right: 6px; }

    button {
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 10px;
      padding: 8px 10px;
      cursor: pointer;
    }
    button.danger {
      border-color: #f1c0c0;
    }
  `],
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  loading = true;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.albums = data;
        this.loading = false;
      },
      error: () => {
        this.albums = [];
        this.loading = false;
      },
    });
  }

  onDelete(id: number): void {
    // JSONPlaceholder "симулирует" — удаляем локально после успешного ответа
    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.albums = this.albums.filter(a => a.id !== id);
      },
    });
  }
}