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


  yearList = ["All", "1990-1999","2000-2009","2010-2020"]
  movies: Movie[] ;  
  movie:Movie;
  selectedYear:string;
  searchTerme:string;

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

  getMovieByYear(year: string){
    if(year == "All"){
      this.movieService.getMovies().subscribe(data => {this.movies=data});
    }
    else{
      let split = year.split("-");
      let min = Number(split[0]);
      let max = Number(split[1]);
      console.log(max);
      this.movieService.getMovies().subscribe(data => this.movies = data.filter( movie => { return movie.year>=min && movie.year<=max}));
    }
  }

  searchByTerme(){
    //console.log(this.searchTerme);
    this.movieService.getMovies().subscribe(data => this.movies = data.filter( movie => { return movie.name.toLocaleLowerCase().includes(this.searchTerme.toLocaleLowerCase())}));
  }

}
