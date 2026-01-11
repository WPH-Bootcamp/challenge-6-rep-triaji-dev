import { useEffect, useState } from 'react';
import type { MovieListResponse } from '../types/movie';
import { getTrendingMovies, getNewReleaseMovies } from '../api/movies';

export const useHome = () => {
  const [trendingData, setTrendingData] = useState<MovieListResponse | null>(null);
  const [newReleaseData, setNewReleaseData] = useState<MovieListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const loadMoreMovies = async () => {
    try {
      const nextPage = page + 1;
      const response = await getNewReleaseMovies(nextPage);

      setNewReleaseData((prev) => {
        if (!prev) return response;
        return {
          ...response,
          results: [...prev.results, ...response.results],
        };
      });

      setPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more movies');
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const [trending, newRelease] = await Promise.all([
          getTrendingMovies(),
          getNewReleaseMovies(1),
        ]);
        
        // Take top 10 for trending
        setTrendingData({
          ...trending,
          results: trending.results.slice(0, 10),
        });
        setNewReleaseData(newRelease);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
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
