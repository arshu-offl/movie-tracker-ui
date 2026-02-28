'use client';

import { useState, useEffect, useMemo } from 'react';
import { fetchMovies, addMovie, updateMovie, deleteMovie } from '../lib/api';
import MovieList from '../components/MovieList';
import AddMovieForm from '../components/AddMovieForm';
import FilterSortPanel from '../components/FilterSortPanel';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState('all'); // 'all', 'watched', 'unwatched'
  const [sort, setSort] = useState('default'); // 'default', 'alpha_asc', 'alpha_desc', 'rating_desc'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies();
      setMovies(data);
    } catch (err) {
      setError('Failed to connect to the movie database. Is the API server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async (newMovieParams) => {
    try {
      const added = await addMovie(newMovieParams);
      // Add to beginning of list
      setMovies(prev => [added, ...prev]);
    } catch (err) {
      alert("Failed to add movie");
    }
  };

  const handleToggleWatched = async (id, watchedStatus) => {
    try {
      // Optmistic update
      setMovies(prev => prev.map(m => m.id === id ? { ...m, watched: watchedStatus } : m));
      // Backend update
      await updateMovie(id, { watched: watchedStatus });
    } catch (err) {
      // Revert on error
      loadMovies();
      alert("Failed to update status");
    }
  };

  const handleUpdateRating = async (id, rating) => {
    try {
      // Optmistic update
      setMovies(prev => prev.map(m => m.id === id ? { ...m, rating } : m));
      // Backend update
      await updateMovie(id, { rating });
    } catch (err) {
      // Revert on error
      loadMovies();
      alert("Failed to update rating");
    }
  };

  const handleDelete = async (id) => {
    try {
      if(!confirm("Are you sure you want to delete this movie?")) return;
      setMovies(prev => prev.filter(m => m.id !== id));
      await deleteMovie(id);
    } catch (err) {
      loadMovies();
      alert("Failed to delete movie");
    }
  }

  // Derive counts
  const totalMovies = movies.length;
  const watchedCount = movies.filter(m => m.watched).length;

  // Filter and sort the rendered list
  const displayMovies = useMemo(() => {
    let result = [...movies];

    if (filter === 'watched') result = result.filter(m => m.watched);
    if (filter === 'unwatched') result = result.filter(m => !m.watched);

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(m => m.title.toLowerCase().includes(lowerQuery));
    }

    switch (sort) {
      case 'alpha_asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'alpha_desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'default':
      default:
        // Keep order from backend (newest first usually if we unshift above)
        break;
    }
    return result;
  }, [movies, filter, sort, searchQuery]);

  return (
    <main className="container pb-12 pt-8">
      <header className="flex-col items-center justify-center mb-12 text-center">
        <h1 className="text-gradient" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
          Surya&apos;s Movie Tracker
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: "1em"}}>
          Your personal watchlist built with love ❤︎⁠
        </p>
      </header>

      {error && (
        <div style={{ background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {/* <AddMovieForm onAdd={handleAddMovie} /> */}

      <FilterSortPanel 
        filter={filter} 
        setFilter={setFilter} 
        sort={sort} 
        setSort={setSort} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalMovies={totalMovies}
        watchedCount={watchedCount}
      />

      {loading && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <div className="spinner"></div>
          <p className="mt-4">Loading your movies...</p>
        </div>
      )}

      {
        !loading && (
          <MovieList 
            movies={displayMovies} 
            onToggleWatched={handleToggleWatched} 
            onUpdateRating={handleUpdateRating}
            onDelete={handleDelete}
          />
        )
      }

    </main>
  );
}
