import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from './movie';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  movies: Movie[] = [
    { id: 1, title: 'Inception', genre: 'Sci-fi', watched: true },
    { id: 2, title: 'The Godfather', genre: 'Drama', watched: false }
  ];

  newTitle = '';
  newGenre = '';
  private nextId = 3;

  addMovie(): void {
    if (!this.newTitle.trim()) return;
    this.movies.push({
      id: this.nextId++,
      title: this.newTitle.trim(),
      genre: this.newGenre.trim() || 'Unknown',
      watched: false
    });
    this.newTitle = '';
    this.newGenre = '';
  }

  deleteMovie(id: number): void {
    this.movies = this.movies.filter(m => m.id !== id);
  }

  toggleWatched(movie: Movie): void {
    movie.watched = !movie.watched;
  }

  clearAll(): void {
    this.movies = [];
  }

  get watchedCount(): number {
    return this.movies.filter(m => m.watched).length;
  }
}
