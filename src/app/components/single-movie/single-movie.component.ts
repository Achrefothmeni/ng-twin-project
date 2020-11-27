import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from '../../shared/movie.service';
import {Router} from "@angular/router"


@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.css']
})
export class SingleMovieComponent implements OnInit {

  @Input() movie:Movie;

  constructor(private activatedRoute: ActivatedRoute, private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    /*this.activatedRoute.paramMap.subscribe(result => this.id=result.get('id'));
    this.movieService.getMovie(Number(this.id)).subscribe(data => this.movie = data);*/
  }

  delete(){
    this.movieService.deleteMovie(this.movie.id).subscribe(() => this.router.navigate(['/movies']));
  }

}
