import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import {MovieService} from '../../shared/movie.service';
import {MatDialog} from '@angular/material/dialog';
import {AddMovieComponent} from '../add-movie/add-movie.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movies: Movie[] ;  

  movie:Movie;

  constructor(private movieService: MovieService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(data => {this.movies=data});
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddMovieComponent, {width: '500px',});
    dialogRef.componentInstance.eventSaveMovie.subscribe(() => {
      this.movie = dialogRef.componentInstance.movie;
      this.movies = [...this.movies, this.movie, ];
      dialogRef.close('Movie added !');
    });

  }

  addMovie(m: Movie){
    this.movieService.addMovie(m).subscribe();
    console.log(m);
  }

}
