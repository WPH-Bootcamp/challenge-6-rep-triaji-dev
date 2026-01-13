import type { Movie } from '../types/movie';
import { useFavoritesStore } from '../store/useFavoritesStore';

interface UseFavoriteReturn {
  favoriteMovies: Movie[];
  loading: boolean;
  handleRemoveFromFavorites: (movieId: number) => void;
}

export const useFavorite = (): UseFavoriteReturn => {
  const favoriteMovies = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const handleRemoveFromFavorites = (movieId: number) => {
    removeFavorite(movieId);
  };

  return {
    favoriteMovies,
    loading: false, 
    handleRemoveFromFavorites,
  };
};
