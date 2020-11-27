import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../models/Movie';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url = 'http://localhost:3000/movies/';

  constructor(private http: HttpClient) { }


  getMovies(){
    return this.http.get<Movie[]>(this.url);
  }

  getMovie(id: number){
    return this.http.get<Movie>(this.url+id);
  }

  deleteMovie(id) {
    return this.http.delete(this.url + id);
  }

  addMovie(m: Movie) {
    return this.http.post(this.url, m);
  }

  searchMovie(id) {
    return this.http.get(this.url + id);
  }

  putMovie(m: Movie, id: string) {
    return this.http.put(this.url+id, m);
  }
}
