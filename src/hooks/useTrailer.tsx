import { useState, useCallback } from 'react';
import { getMovieTrailer } from '../api/movies';

interface UseTrailerReturn {
  handleWatchTrailer: (movieId: number, key?: string) => Promise<void>;
  isLoading: boolean;
  trailerKey: string | null;
  isModalOpen: boolean;
  closeModal: () => void;
}

export const useTrailer = (): UseTrailerReturn => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWatchTrailer = useCallback(async (movieId: number, key?: string) => {
    if (key) {
      setTrailerKey(key);
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      const fetchedKey = await getMovieTrailer(movieId);
      if (fetchedKey) {
        setTrailerKey(fetchedKey);
        setIsModalOpen(true);
      } else {
        // TODO: Handle no trailer found case using toast
        alert('No trailer available for this movie.');
      }
    } catch (error) {
      console.error('Failed to fetch trailer', error);
      alert('Failed to load trailer.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTrailerKey(null);
  }, []);

  return {
    handleWatchTrailer,
    isLoading,
    trailerKey,
    isModalOpen,
    closeModal,
  };
};
