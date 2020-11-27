import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Movie} from '../../models/Movie';
import {MovieService} from '../../shared/movie.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {

  //@Input() year: string;
  /*@Input() year: string;
  @Input() genre: string;
  @Input() description: string;
  @Input() rating: string;*/

  updateForm: FormGroup;
  
  /*name : FormControl;
  year : FormControl;
  genre : FormControl;
  description : FormControl;
  rating : FormControl;*/

  id:string;
  movie:Movie;

  newMovie:Movie;


  constructor(private activatedRoute: ActivatedRoute, private movieService : MovieService, private router: Router) { }

  ngOnInit(): void {
    //this.nameForm = new FormControl(this.year);
    /*this.yearForm = new FormControl(this.year);
    this.genreForm = new FormControl(this.genre);
    this.descriptionForm = new FormControl(this.description);
    this.ratingForm = new FormControl(this.rating);*/
    this.activatedRoute.paramMap.subscribe(result => {
      this.id=result.get('id');
      this.movieService.getMovie(Number(this.id)).subscribe(data => {
        this.movie = data;
        this.updateForm = new FormGroup({
          name : new FormControl(this.movie.name, [Validators.required]),
          year : new FormControl(this.movie.year, [Validators.required, Validators.pattern('[0-9]{4}')]),
          genre : new FormControl(this.movie.genre, [Validators.required]),
          description : new FormControl(this.movie.description, [Validators.required]),
          rating : new FormControl(this.movie.rating, [Validators.required, Validators.pattern('[0-9]{1}[.]{1}[0-9]{1}|[0-9]{1}')]),
        });
        
      });
    });
  }

  update(){
    this.newMovie = new Movie();
    this.newMovie.id = this.movie.id;
    this.newMovie.name = this.updateForm.value['name'];
    this.newMovie.genre = this.updateForm.value['genre'];
    this.newMovie.description = this.updateForm.value['description'];
    this.newMovie.rating = this.updateForm.value['rating'];
    this.newMovie.year = this.updateForm.value['year'];
    this.newMovie.image = this.movie.image;
    this.movieService.putMovie(this.newMovie, this.id).subscribe(()=>{
      this.router.navigate(['/movies']);
    })
  }

}
