import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
  standalone: true,
  imports: [],
  template: `
    <h1>Albums</h1>

    <p class="muted">debug: loading={{loading}}, albums={{albums.length}}</p>

    @if (loading) {
    <p>Loading albums...</p>
    } @else {

    @for (album of albums; track album.id) {
        <div class="album">
        <span>#{{album.id}} {{album.title}}</span>
        <button>Delete</button>
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
    console.log('AlbumsComponent: ngOnInit start');

    this.albumService.getAlbums().subscribe({
        next: (data) => {
        console.log('AlbumsComponent: NEXT, length =', data?.length);
        console.log('first item =', data?.[0]);
        this.albums = data;
        this.loading = false;
        },
        error: (err) => {
        console.log('AlbumsComponent: ERROR =', err);
        this.loading = false;
        },
        complete: () => {
        console.log('AlbumsComponent: COMPLETE');
        },
    });
    }

  onDelete(id: number): void {
    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.albums = this.albums.filter(a => a.id !== id);
      },
    });
  }
}