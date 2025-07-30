import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieServiceService } from '../movie-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
 movie: any;
   
   constructor(
    private route: ActivatedRoute,
    private movieService: MovieServiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(id).subscribe({
        next: (data) => {
          this.movie = data;
        },
        error: (error) => {
          console.error('Error fetching movie details:', error);
        }
      });
    }
  }
}
