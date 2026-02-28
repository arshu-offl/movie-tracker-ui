'use client';
import styles from '../styles/MovieCard.module.css';

export default function MovieCard({ movie, onToggleWatched, onUpdateRating, onDelete }) {
  
  const handleRating = (ratingValue) => {
    onUpdateRating(movie.id, ratingValue);
  };

  const handleToggle = () => {
    onToggleWatched(movie.id, !movie.watched);
  };

  return (
    <div className={`${styles.card} glass ${movie.watched ? styles.watchedCard : ''}`}>
      {/* Delete button (x) top right */}
      <button 
        className={styles.deleteBtn} 
        onClick={() => onDelete(movie.id)}
        title="Delete Movie"
      >
        ×
      </button>

      <div className={styles.imageContainer}>
        {movie.image ? (
          <img src={movie.image} alt={movie.title} className={styles.image} />
        ) : (
          <div className={`${styles.imagePlaceholder} bgGradient`}>
            <span>{movie.title.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title} title={movie.title}>{movie.title}</h3>
        
        {/* Optional Metadata */}
        {(movie.director || movie.actors) && (
          <div className={styles.meta}>
            {movie.director && <p><strong>Dir:</strong> {movie.director}</p>}
            {movie.actors && <p><strong>Cast:</strong> {movie.actors}</p>}
          </div>
        )}

        <div className={styles.actions}>
          <button 
            className={`${styles.toggleBtn} ${movie.watched ? styles.watchedBtn : styles.unwatchedBtn}`}
            onClick={handleToggle}
          >
            {movie.watched ? '✓ Watched' : 'Mark as Watched'}
          </button>
        </div>

        {/* Rating system - only fully shown/enabled if watched */}
        <div className={`${styles.ratingContainer} ${!movie.watched ? styles.disabledRating : ''}`}>
          <p className={styles.ratingLabel}>Rating:</p>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`${styles.star} ${movie.rating >= star ? styles.starFilled : ''}`}
                onClick={() => movie.watched && handleRating(star)}
                disabled={!movie.watched}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
