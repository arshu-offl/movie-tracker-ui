'use client';
import { useState } from 'react';
import styles from '../styles/AddMovieForm.module.css';

export default function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [director, setDirector] = useState('');
  const [actors, setActors] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd({ title, image, director, actors });
    setTitle('');
    setImage('');
    setDirector('');
    setActors('');
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      {!isOpen ? (
        <button className={styles.openBtn} onClick={() => setIsOpen(true)}>
          + Add New Movie
        </button>
      ) : (
        <form className={`${styles.form} glass`} onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h3>Add a New Movie</h3>
            <button type="button" className={styles.closeBtn} onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="title">Movie Title *</label>
            <input 
              id="title"
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g. Inception"
              required
              autoFocus
            />
          </div>

          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="director">Director (Optional)</label>
              <input 
                id="director"
                type="text" 
                value={director} 
                onChange={e => setDirector(e.target.value)} 
                placeholder="Christopher Nolan"
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="image">Image URL (Optional)</label>
              <input 
                id="image"
                type="url" 
                value={image} 
                onChange={e => setImage(e.target.value)} 
                placeholder="https://example.com/poster.jpg"
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="actors">Leading Actors (Optional)</label>
            <input 
              id="actors"
              type="text" 
              value={actors} 
              onChange={e => setActors(e.target.value)} 
              placeholder="Leonardo DiCaprio, Elliot Page"
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Add Movie
          </button>
        </form>
      )}
    </div>
  );
}
