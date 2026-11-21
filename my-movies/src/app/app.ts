import { Component } from '@angular/core';
import { signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from './movie';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // signal : la liste des films prévient Angular à chaque changement
  // Au démarrage, on reprend la liste sauvegardée dans le navigateur (s'il y en a une)
  movies = signal<Movie[]>(this.loadMovies());

  newTitle = '';
  newGenre = '';
  // Le prochain id part du plus grand id existant, pour ne jamais avoir deux fois le même
  private nextId = Math.max(0, ...this.movies().map(m => m.id)) + 1;

  constructor() {
    // effect : side effect, sauvegarde la liste dans le navigateur (localStorage)
    // pour qu'elle reste après un rafraîchissement de la page
    effect(() => {
      localStorage.setItem('movies', JSON.stringify(this.movies()));
    });

    // effect : side effect, envoie la liste à une API à chaque changement
    effect(() => {
      const list = this.movies();
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
      })
        .then(res => res.json())
        .then(data => console.log('Réponse de l\'API :', data))
        .catch(err => console.error('Erreur API :', err));
    });
  }

  addMovie(): void {
    if (!this.newTitle.trim()) return;
    this.movies.update(list => [
      ...list,
      {
        id: this.nextId++,
        title: this.newTitle.trim(),
        genre: this.newGenre.trim() || 'Unknown',
        watched: false
      }
    ]);
    this.newTitle = '';
    this.newGenre = '';
  }

  deleteMovie(id: number): void {
    this.movies.update(list => list.filter(m => m.id !== id));
  }

  toggleWatched(movie: Movie): void {
    this.movies.update(list =>
      list.map(m => (m.id === movie.id ? { ...m, watched: !m.watched } : m))
    );
  }

  clearAll(): void {
    this.movies.set([]);
  }

  // Lit la liste sauvegardée ; sinon, renvoie les deux films de départ
  private loadMovies(): Movie[] {
    const saved = localStorage.getItem('movies');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, title: 'Inception', genre: 'Sci-fi', watched: true },
      { id: 2, title: 'The Godfather', genre: 'Drama', watched: false }
    ];
  }

  // computed : se recalcule tout seul quand movies change
  watchedCount = computed(() => this.movies().filter(m => m.watched).length);
}
