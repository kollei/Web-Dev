import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { AboutComponent } from './pages/about.component';
import { AlbumsComponent } from './pages/albums.component';
import { AlbumDetailComponent } from './pages/album-detail.component';
import { AlbumPhotosComponent } from './pages/album-photos.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },       
  { path: 'home', component: HomeComponent },                  
  { path: 'about', component: AboutComponent },              
  { path: 'albums', component: AlbumsComponent },             
  { path: 'albums/:id', component: AlbumDetailComponent },   
  { path: 'albums/:id/photos', component: AlbumPhotosComponent }, 
  { path: '**', redirectTo: 'home' },
];