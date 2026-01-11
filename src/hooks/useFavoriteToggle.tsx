import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';
import { toast } from 'sonner';

interface UseFavoriteToggleProps {
  movieId: number;
  movieData: Movie;
  onRemoveFromFavorites?: (id: number) => void;
}

export const useFavoriteToggle = ({
  movieId,
  movieData,
  onRemoveFromFavorites,
}: UseFavoriteToggleProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const exists = favorites.some((fav: Movie) => fav.id === movieId);
    setIsFavorite(exists);
  }, [movieId]);

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      const newFavorites = favorites.filter((fav: Movie) => fav.id !== movieId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
      if (onRemoveFromFavorites) {
        onRemoveFromFavorites(movieId);
      }
      toast.custom(() => {
        const isMobile = window.innerWidth < 640;
        const width = isMobile ? 300 : 520;
        return (
          <div
            className='w-full bg-black/60 backdrop-blur-md rounded-md flex items-center justify-center gap-3 px-4 py-3 shadow-lg border border-white/10 translate-y-30'
            style={{ width: `${width}px` }}
          >
            <img
              src='/icons/icon-cross.svg'
              alt='remove'
              className='w-6 h-6'
            />
            <p className='text-white text-sm font-medium text-center'>
              Success Remove from Favorites
            </p>
          </div>
        );
      }, { duration: 2000 });
    } else {
      const newFavorites = [...favorites, movieData];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(true);
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
