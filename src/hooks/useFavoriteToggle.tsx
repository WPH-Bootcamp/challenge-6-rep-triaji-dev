import { toast } from 'sonner';
import { X } from 'lucide-react';
import { useFavoritesStore } from '../store/useFavoritesStore';
import type { Movie } from '../types/movie';

interface UseFavoriteToggleProps {
  movieId: number;
  movieData: Movie;
}

interface UseFavoriteToggleReturn {
  isFavorite: boolean;
  handleFavoriteToggle: () => void;
}

export const useFavoriteToggle = ({
  movieId,
  movieData,
}: UseFavoriteToggleProps): UseFavoriteToggleReturn => {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(movieId));
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(movieId);
      toast.custom(() => {
        const isMobile = window.innerWidth < 640;
        const width = isMobile ? 300 : 520;
        return (
          <div
            className='w-full bg-black/60 backdrop-blur-md rounded-md flex items-center justify-center gap-3 px-4 py-3 shadow-lg border border-white/10 translate-y-30'
            style={{ width: `${width}px` }}
          >
            <div className='w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center shrink-0'>
              <X className='w-4 h-4 text-white' />
            </div>
            <p className='text-white text-sm font-medium text-center'>
              Success Remove from Favorites
            </p>
          </div>
        );
      }, { duration: 2000 });
    } else {
      addFavorite(movieData);
      toast.custom(() => {
        const isMobile = window.innerWidth < 640;
        const width = isMobile ? 300 : 520;
        return (
          <div
            className='w-full bg-black/60 backdrop-blur-md rounded-md flex items-center justify-center gap-3 px-4 py-3 shadow-lg border border-white/10 translate-y-30'
            style={{ width: `${width}px` }}
          >
            <img
              src='/icons/icon-check.svg'
              alt='success'
              className='w-6 h-6'
            />
            <p className='text-white text-sm font-medium text-center'>
              Success Add to Favorites
            </p>
          </div>
        );
      }, { duration: 2000 });
    }
  };

  return {
    isFavorite,
    handleFavoriteToggle,
  };
};
