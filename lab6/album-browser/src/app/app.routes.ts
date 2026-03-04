import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AboutComponent } from './pages/about.component';
import { AlbumsComponent } from './pages/albums.component';
import { AlbumDetailComponent } from './pages/album-detail.component';
import { AlbumPhotosComponent } from './pages/album-photos.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },          // (root) -> /home
  { path: 'home', component: HomeComponent },                   // /home
  { path: 'about', component: AboutComponent },                 // /about
  { path: 'albums', component: AlbumsComponent },               // /albums
  { path: 'albums/:id', component: AlbumDetailComponent },      // /albums/:id
  { path: 'albums/:id/photos', component: AlbumPhotosComponent }, // /albums/:id/photos
  { path: '**', redirectTo: 'home' },
];