import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { MovieListResponse } from '../../../interfaces/movie.interface';
import { performSearch, handleSearchError } from './helper';

export const useSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [searchResults, setSearchResults] = useState<MovieListResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const searchMovies = async (searchQuery: string, pageNum: number = 1) => {
    if (!/[a-zA-Z0-9]/.test(searchQuery)) {
      setSearchResults(null);
      setError(null);
      return;
    }
    if (!searchQuery.trim()) {
      setSearchResults(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await performSearch(searchQuery, pageNum);

      if (pageNum === 1) {
        setSearchResults(results);
      } else {
        setSearchResults((prev) =>
          prev
            ? {
                ...results,
                results: [...prev.results, ...results.results],
              }
            : results
        );
      }

      setPage(pageNum);
    } catch (err) {
      setError(handleSearchError(err));
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = () => {
    if (searchResults && page < searchResults.total_pages) {
      searchMovies(query, page + 1);
    }
  };

  useEffect(() => {
    if (query && /[a-zA-Z0-9]/.test(query)) {
      setPage(1);
      searchMovies(query, 1);
    } else {
      setSearchResults(null);
      setError(null);
    }
  }, [query]);

  return {
    query,
    searchResults,
    loading,
    error,
    hasMoreResults: searchResults ? page < searchResults.total_pages : false,
    loadMoreResults,
    searchMovies,
  };
};
