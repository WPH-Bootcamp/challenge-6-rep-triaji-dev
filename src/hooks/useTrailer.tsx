import { useState } from 'react';
import { getMovieTrailer } from '../api/movies';

export const useTrailer = () => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWatchTrailer = async (movieId: number, key?: string) => {
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
        // Handle no trailer found case if needed, e.g. toast
        alert('No trailer available for this movie.');
      }
    } catch (error) {
      console.error('Failed to fetch trailer', error);
      alert('Failed to load trailer.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerKey(null);
  };

  return {
    handleWatchTrailer,
    isLoading,
    trailerKey,
    isModalOpen,
    closeModal,
  };
};
