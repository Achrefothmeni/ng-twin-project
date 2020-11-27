import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SingleMovieComponent} from '../app/components/single-movie/single-movie.component';
import {MovieComponent} from '../app/components/movie/movie.component';
import {UpdateMovieComponent} from '../app/components/update-movie/update-movie.component';


const routes: Routes = [
  { path: '',   redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movie/:id', component: UpdateMovieComponent },
  { path: 'movies', component: MovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
