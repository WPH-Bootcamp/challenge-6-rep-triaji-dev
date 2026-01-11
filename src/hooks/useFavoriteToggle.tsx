import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';

interface UseFavoriteToggleProps {
  movieId: number;
  movieData: Movie;
  onRemoveFromFavorites?: (id: number) => void;
}

export const useFavoriteToggle = ({
  movieId,
  movieData,
  onRemoveFromFavorites,
}: UseFavoriteToggleProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = favorites.some((fav: Movie) => fav.id === movieId);
    setIsFavorite(exists);
  }, [movieId]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter((fav: Movie) => fav.id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
      if (onRemoveFromFavorites) {
        onRemoveFromFavorites(movieId);
      }
    } else {
      const newFavorites = [...favorites, movieData];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(true);
    }
  };

  return {
    isFavorite,
    handleFavoriteToggle,
  };
};
