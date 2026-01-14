import { useState, useCallback } from 'react';
import { getMovieTrailer } from '../api/movies';
import { toast } from 'sonner';
import { X } from 'lucide-react';

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
        toast.custom(
          () => {
            const isMobile = window.innerWidth < 640;
            const width = isMobile ? 300 : 520;
            return (
              <div
                className='w-full bg-black/60 backdrop-blur-md rounded-md flex-center gap-3 px-4 py-3 shadow-lg border border-white/10 translate-y-30'
                style={{ width: `${width}px` }}
              >
                <div className='w-6 h-6 rounded-full bg-red-500 flex-center shrink-0'>
                  <X className='w-4 h-4 text-white' />
                </div>
                <p className='text-white text-sm font-medium text-center'>
                  No trailer available for this movie
                </p>
              </div>
            );
          },
          { duration: 2000 }
        );
      }
    } catch (error) {
      console.error('Failed to fetch trailer', error);
      toast.custom(
        () => {
          const isMobile = window.innerWidth < 640;
          const width = isMobile ? 300 : 520;
          return (
            <div
              className='w-full bg-black/30 backdrop-blur-lg rounded-lg flex-center gap-3 px-4 py-3 shadow-lg border border-white/10 translate-y-30'
              style={{ width: `${width}px` }}
            >
              <div className='w-6 h-6 rounded-full bg-red-500 flex-center shrink-0'>
                <X className='w-4 h-4 text-white' />
              </div>
              <p className='text-white text-md font-medium text-center'>
                Failed to load trailer. Please try again later.
              </p>
            </div>
          );
        },
        { duration: 2000 }
      );
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
