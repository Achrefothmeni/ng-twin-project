import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import {Categorie} from '../models/Categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  url = 'http://localhost:3000/Categories/';

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }


  getCategories(){
    return this.http.get<Categorie[]>(this.url);
  }

  deleteCategorie(id) {
    return this.http.delete(this.url + id);
  }

  addCategorie(m: Categorie) {
    return this.http.post(this.url, m);
  }

  searchCategorie(id) {
    return this.http.get(this.url + id);
  }

  putCategorie(m: Categorie) {
    return this.http.put(this.url, m);
  }

}
