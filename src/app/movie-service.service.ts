import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {
   private apiUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=1b7bfd53';

  constructor(private http: HttpClient) {}

  getMovies(searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}&s=${searchTerm}`);
  }

  getMovieById(id: string) {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=1b7bfd53`;  
  return this.http.get(url);
}


  getMovieDetails(id: string): Observable<any> {
  const url = `https://www.omdbapi.com/?i=${id}&apikey=1b7bfd53`;
  return this.http.get(url);
}

searchMovies(title: string) {
  const url = `https://www.omdbapi.com/?apikey=1b7bfd53&s=${title}`;
  return this.http.get(url);
}

}
