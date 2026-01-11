import type { Movie } from '../../../interfaces/movie.interface';
import type { Genre } from '../../../services/movies/services';
import { addToFavorites, removeFromFavorites } from '../favoritepage/helper';
import toast from 'react-hot-toast';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDate = (dateStr: string): string => {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

type MovieWithGenres = Movie & {
  genres?: { id: number; name: string }[];
};

export const getGenreNames = (
  movie: MovieWithGenres,
  genres: Genre[]
): string[] => {
  if (Array.isArray(movie.genres) && movie.genres.length > 0) {
    return movie.genres.map((g) => g.name);
  } else if (movie.genre_ids) {
    return movie.genre_ids
      .map((id) => genres.find((g) => g.id === id)?.name || '')
      .filter(Boolean);
  }
  return [];
};

export const handleFavoriteToggle = (
  movie: Movie,
  isFavorite: boolean,
  setIsFavorite: (value: boolean) => void
): void => {
  if (isFavorite) {
    removeFromFavorites(movie.id);
    toast.success('Removed from favorites');
  } else {
    addToFavorites({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      overview: movie.overview,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      backdrop_path: movie.backdrop_path,
    });
    toast.success('Added to favorites');
  }
  setIsFavorite(!isFavorite);
};
