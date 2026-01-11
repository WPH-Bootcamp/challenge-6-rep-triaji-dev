import { useEffect, useState } from 'react';
import type { MovieListResponse } from '../../../interfaces/movie.interface';
import { fetchInitialMovies, fetchMoreMovies, handleError } from './helper';

export const useHome = () => {
  const [trendingData, setTrendingData] = useState<MovieListResponse | null>(
    null
  );
  const [newReleaseData, setNewReleaseData] =
    useState<MovieListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const loadMoreMovies = async () => {
    try {
      const nextPage = page + 1;
      const response = await fetchMoreMovies(nextPage);

      setNewReleaseData((prev) => ({
        ...response,
        results: [...(prev?.results || []), ...response.results],
      }));

      setPage(nextPage);
    } catch (err) {
      setError(handleError(err));
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { trendingData, newReleaseData } = await fetchInitialMovies();
        setTrendingData(trendingData);
        setNewReleaseData(newReleaseData);
        setLoading(false);
      } catch (err) {
        setError(handleError(err));
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return {
    trendingMovies: trendingData?.results || [],
    newReleaseMovies: newReleaseData?.results || [],
    loading,
    error,
    loadMoreMovies,
    hasMoreMovies: newReleaseData ? page < newReleaseData.total_pages : false,
  };
};
