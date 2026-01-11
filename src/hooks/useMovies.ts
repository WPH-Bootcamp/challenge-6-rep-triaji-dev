import { useQuery } from '@tanstack/react-query';
import {
  getTrendingMovies,
  getNewReleaseMovies,
  searchMovies,
} from '../api/movies';

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: getTrendingMovies,
  });
};

export const useNewReleaseMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'new-release', page],
    queryFn: () => getNewReleaseMovies(page),
  });
};

export const useMovieSearch = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: !!query,
  });
};
