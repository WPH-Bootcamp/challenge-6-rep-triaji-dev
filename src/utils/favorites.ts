import type { Movie } from '../types/movie';

const FAVORITES_KEY = 'favorites';

export const getFavoriteMovies = (): Movie[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (movie: Movie): void => {
  const favorites = getFavoriteMovies();
  if (!favorites.some((fav) => fav.id === movie.id)) {
    favorites.push(movie);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event('storage'));
  }
};

export const removeFromFavorites = (movieId: number): void => {
  const favorites = getFavoriteMovies();
  const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  window.dispatchEvent(new Event('storage'));
};

export const isMovieFavorited = (movieId: number): boolean => {
  const favorites = getFavoriteMovies();
  return favorites.some((movie) => movie.id === movieId);
};
