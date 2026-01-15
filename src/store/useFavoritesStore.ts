import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie } from '../types/movie';

interface FavoritesState {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => {
          if (state.favorites.some((fav) => fav.id === movie.id)) {
            return state;
          }
          return { favorites: [...state.favorites, movie] };
        }),
      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.id !== movieId),
        })),
      isFavorite: (movieId) =>
        get().favorites.some((movie) => movie.id === movieId),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
