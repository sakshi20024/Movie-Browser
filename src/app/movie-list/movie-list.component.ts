import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MovieServiceService } from '../movie-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Movie } from '../Model/movie';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit { 
   searchTerm = '';
  selectedGenre = '';
  genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi','Thriller', 'Adventure', 'Animation', 'Documentary', 'Crime', 'History', 'Mystery'];

  movies: Movie[] = [];               
  recentMovies: Movie[] = [];    
  topRankedMovies: Movie[] = [];     
  filteredMovies: Movie[] = [];       

  constructor(private movieService: MovieServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getRecentMovies();
    this.getTopRankedMovies();
  }

  getMovies(): void {
    if (this.searchTerm.trim().length < 2) return;

    this.movieService.searchMovies(this.searchTerm).subscribe((res: any) => {
      this.movies = res.Search || [];
    });
  }

 getRecentMovies(): void {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    this.recentMovies = [];

    this.movieService.searchMovies('action').subscribe((res: any) => {
      if (res.Search && res.Search.length > 0) {
        this.recentMovies = res.Search.filter((movie: any) => {
          const releaseDate = movie.Released || movie.Year;

          if (!releaseDate) return false;

          let releaseYear = new Date(releaseDate).getFullYear();
          if (isNaN(releaseYear)) {
            releaseYear = parseInt(movie.Year, 10);  
          }

          return releaseYear >= lastYear;  
        });
      }
    });
  }

  getTopRankedMovies(): void {
    this.topRankedMovies = [];

    this.movieService.searchMovies('all time').subscribe((res: any) => {
      if (res.Search) {
        this.topRankedMovies = res.Search
          .filter((movie: any) => movie.imdbRating !== 'N/A') 
          .sort((a: any, b: any) => parseFloat(b.imdbRating) - parseFloat(a.imdbRating)) 
          .slice(0, 10); 
      }
    });
  }

  filterByGenre(): void {
    if (!this.selectedGenre) {
      this.filteredMovies = [];
      return;
    }

    this.movieService.searchMovies(this.selectedGenre).subscribe((res: any) => {
      this.filteredMovies = res.Search || [];
    });
  }

  goToMovieDetails(id: string): void {
    this.router.navigate([`/movie/${id}`]);
  }

 
  getPoster(poster: string): string {
    return poster !== 'N/A' ? poster : 'assets/placeholder.jpg';
  }
}