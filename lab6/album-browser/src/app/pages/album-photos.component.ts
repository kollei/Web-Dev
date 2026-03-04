import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { Photo } from '../models/photo';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    <h1>Photos</h1>

    @if (loading) {
      <p class="muted">Loading photos...</p>
    } @else {
      <div class="top">
        <a class="link" [routerLink]="['/albums', albumId]">← Back to Album</a>
      </div>

      @if (photos.length === 0) {
        <p class="muted">No photos.</p>
      } @else {
        <div class="grid">
          @for (p of photos; track p.id) {
            <div class="card">
              <img [src]="p.thumbnailUrl" [alt]="p.title" />
              <div class="caption">{{ p.title }}</div>
            </div>
          }
        </div>
      }
    }
  `,
  styles: [`
    h1 { margin: 0 0 12px; }
    .muted { color: #666; }

    .top { margin: 8px 0 14px; }
    .link { text-decoration: none; color: #111; }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
    }

    .card {
      border: 1px solid #e7e7e7;
      border-radius: 14px;
      overflow: hidden;
      background: white;
    }

    img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      display: block;
    }

    .caption {
      padding: 8px 10px;
      font-size: 12px;
      color: #333;
      line-height: 1.2;
      max-height: 2.4em;
      overflow: hidden;
    }
  `],
})
export class AlbumPhotosComponent implements OnInit {
  photos: Photo[] = [];
  loading = true;
  albumId = 0;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.albumId = Number(this.route.snapshot.paramMap.get('id'));

    this.albumService.getAlbumPhotos(this.albumId).subscribe({
      next: (data) => {
        this.photos = data;
        this.loading = false;
      },
      error: () => {
        this.photos = [];
        this.loading = false;
      },
    });
  }
}