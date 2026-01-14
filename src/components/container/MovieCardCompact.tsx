import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../api/movies';
import type { MovieCardProps } from '../../types/movie';
import { useFavoriteToggle } from '../../hooks/useFavoriteToggle';
import FavoriteButton from '../ui/FavoriteButton';
import Skeleton from '../ui/Skeleton';
import LoadingSpinner from '../ui/LoadingSpinner';

const MovieCardCompact: React.FC<MovieCardProps> = ({
  movie,
  size = 'medium',
  trendingRank = 0,
  onImageLoad,
}) => {
  const navigate = useNavigate();
  const { isFavorite, handleFavoriteToggle } = useFavoriteToggle({
    movieId: movie.id,
    movieData: movie,
  });

  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-xl',
  };

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className={`relative group ${
        !isImageLoaded ? 'cursor-default pointer-events-none' : 'cursor-pointer'
      }`}
      onClick={!isImageLoaded ? undefined : handleClick}
    >
      <div className='relative overflow-hidden rounded-lg aspect-2/3 mb-2 bg-neutral-800'>
        {!isImageLoaded && (
          <LoadingSpinner className='absolute inset-0 w-full h-full z-10 bg-neutral-900' size="medium" />
        )}
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            !isImageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          loading='lazy'
          onLoad={() => {
            setIsImageLoaded(true);
            onImageLoad?.(movie.id);
          }}
          onError={() => {
            setIsImageLoaded(true);
            onImageLoad?.(movie.id);
          }}
        />
      </div>
      {!isImageLoaded ? (
        <Skeleton className='h-6 w-3/4 mb-1' />
      ) : (
        <h3
          className={`font-medium ${
            sizeClasses[size]
          } line-clamp-1 group-hover:text-primary-300 transition-colors`}
        >
          {movie.title}
        </h3>
      )}

      {!isImageLoaded ? (
        <Skeleton className='h-5 w-1/2 mt-2 mb-2' />
      ) : (
        <div
          className={`text-md text-neutral-400 mt-2 mb-2 group-hover:opacity-50 transition-opacity duration-300`}
        >
          ⭐ {movie.vote_average.toFixed(1)}/10
        </div>
      )}

      {trendingRank > 0 && (
        <div className='absolute top-3 left-3 z-10 w-8 h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 rounded-full bg-neutral-950/60 flex items-center justify-center text-neutral-25 text-lg font-semibold'>
          <span>{trendingRank}</span>
        </div>
      )}
      <FavoriteButton
        isFavorite={isFavorite}
        onClick={handleFavoriteToggle}
        variant='card'
        className={`absolute top-3 right-3 z-10 transition-all duration-300 w-8 h-8 lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 ${
          isFavorite ? 'opacity-100 ' : 'opacity-0 group-hover:opacity-100'
        }`}
      />
    </div>
  );
};

export default React.memo(MovieCardCompact);
