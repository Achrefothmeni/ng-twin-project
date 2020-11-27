import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Movie} from '../../models/Movie';
import {MovieService} from '../../shared/movie.service';
import {FormControl, Validators, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movie: Movie;
  @Output() eventSaveMovie = new EventEmitter<Movie>();

  constructor(private movieService : MovieService) { }

  ngOnInit(): void {
    this.movie = new Movie();
  }

  addMovie(formulaire : NgForm){
    this.movieService.addMovie(this.movie).subscribe();
    this.eventSaveMovie.emit(this.movie);
    //console.log(formulaire);
  }

  

}
