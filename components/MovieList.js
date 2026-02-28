'use client';
import MovieCard from './MovieCard';
import styles from '../styles/MovieList.module.css';

export default function MovieList({ movies, onToggleWatched, onUpdateRating, onDelete }) {
  if (movies.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No movies found</h3>
        <p>Try adjusting your filters or add a new movie.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {movies.map(movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onToggleWatched={onToggleWatched}
          onUpdateRating={onUpdateRating}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
