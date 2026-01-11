import { useState, useEffect } from 'react';
import type { Movie } from '../../../interfaces/movie.interface';
import { getFavoriteMovies, removeFromFavorites } from './helper';

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
      if (e.key === 'favorite_movies') {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
