import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Album } from '../../models/album';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent implements OnInit {
  album: Album | null = null;
  editedTitle = '';
  loading = true;
  message = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.albumService.getAlbum(id).subscribe({
      next: (data) => {
        this.album = data;
        this.editedTitle = data.title;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load album details.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  save(): void {
    if (!this.album) {
      return;
    }

    const updatedAlbum: Album = {
      ...this.album,
      title: this.editedTitle
    };

    this.albumService.updateAlbum(updatedAlbum).subscribe({
      next: () => {
        this.album = updatedAlbum;
        this.message = 'Album saved successfully.';
        this.error = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to update album.';
        this.message = '';
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}