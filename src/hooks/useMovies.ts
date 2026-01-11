import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  getTrendingMovies,
  getNewReleaseMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieTrailer,
  getGenres,
} from '../api/movies';
import type { MovieListResponse } from '../types/movie';

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

export const useNewReleaseMoviesInfinite = () => {
  return useInfiniteQuery({
    queryKey: ['movies', 'new-release', 'infinite'],
    queryFn: ({ pageParam = 1 }) => getNewReleaseMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage: MovieListResponse) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
  });
};

export const useMovieSearch = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: () => searchMovies(query, page),
    enabled: !!query,
  });
};

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ['movie', id, 'details'],
    queryFn: () => getMovieDetails(id),
    enabled: !!id,
  });
};

export const useMovieCredits = (id: number) => {
  return useQuery({
    queryKey: ['movie', id, 'credits'],
    queryFn: () => getMovieCredits(id),
    enabled: !!id,
  });
};

export const useMovieTrailer = (id: number) => {
  return useQuery({
    queryKey: ['movie', id, 'trailer'],
    queryFn: () => getMovieTrailer(id),
    enabled: !!id,
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
};
