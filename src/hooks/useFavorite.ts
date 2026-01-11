import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';
import { getFavoriteMovies, removeFromFavorites } from '../utils/favorites';

export const useFavorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const favorites = getFavoriteMovies();
        setFavoriteMovies(favorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'favorites') {
        loadFavorites();
      }
    };

    // Custom event listener for same-tab updates
    const handleCustomStorageChange = () => {
      loadFavorites();
    }

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('storage', handleCustomStorageChange); // Listening to the event dispatched in utils
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('storage', handleCustomStorageChange);
    };
  }, []);

  const handleRemoveFromFavorites = (movieId: number) => {
    removeFromFavorites(movieId);
    setFavoriteMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return {
    favoriteMovies,
    loading,
    handleRemoveFromFavorites,
  };
};
