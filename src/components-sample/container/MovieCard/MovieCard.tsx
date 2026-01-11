import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getImageUrl } from '../../../services/movies/services';
import type { MovieCardProps } from './MovieCard.interface';
import { IoPlayCircle } from 'react-icons/io5';
import { useFavoriteToggle } from '../../../hooks/useFavoriteToggle';
import FavoriteButton from '../../ui/FavoriteButton/FavoriteButton';

const TrailerButton: React.FC<{
  onClick?: () => void;
  disabled: boolean;
  className?: string;
}> = ({ onClick, disabled, className = '' }) => (
  <button
    className={`bg-primary-300 hover:bg-primary-400 text-white font-semibold rounded-full px-7 py-3 flex items-center justify-center gap-2 text-base shadow-md transition-colors duration-200 cursor-pointer ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    <span className='flex items-center justify-center gap-2'>
      Watch Trailer <IoPlayCircle size={22} />
    </span>
  </button>
);

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  variant = 'compact',
  size = 'medium',
  trendingRank = 0,
  onWatchTrailer,
  trailerAvailable = true,
  onRemoveFromFavorites,
  children,
}) => {
  const navigate = useNavigate();
  const { isFavorite, handleFavoriteToggle } = useFavoriteToggle({
    movieId: movie.id,
    movieData: movie,
    onRemoveFromFavorites,
  });

  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-lg',
  };

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  if (variant === 'compact') {
    return (
      <div className='relative group cursor-pointer' onClick={handleClick}>
        <div className='relative overflow-hidden rounded-lg aspect-[2/3] mb-2'>
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
            loading='lazy'
          />
        </div>
        <h3
          className={`font-medium ${sizeClasses[size]} line-clamp-1 group-hover:text-primary-300 transition-colors`}
        >
          {movie.title}
        </h3>
        <div className={`text-md text-neutral-400 mt-2 mb-2`}>
          ⭐ {movie.vote_average.toFixed(1)}/10
        </div>
        {trendingRank > 0 && (
          <div className='absolute top-3 left-3 z-10 w-12 h-12 rounded-full bg-neutral-950/60 flex items-center justify-center text-neutral-25 text-lg font-semibold'>
            <span>{trendingRank}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='relative flex flex-col mb-0 lg:mb-16 mt-8 w-full border-b border-neutral-800 last:border-b-0 pb-8'>
      <FavoriteButton
        isFavorite={isFavorite}
        onClick={handleFavoriteToggle}
        className='absolute top-6 right-6 lg:flex hidden z-10'
      />

      <div className='flex flex-row lg:items-start p-4 lg:px-8 rounded-2xl'>
        {/* Poster */}
        <Link
          to={`/movie/${movie.id}`}
          tabIndex={0}
          aria-label={`Go to details for ${movie.title}`}
          className='flex-shrink-0 mr-4 lg:mr-8'
        >
          <img
            src={
              movie.poster_path
                ? getImageUrl(movie.poster_path)
                : '/data-not-foundpng.png'
            }
            alt={movie.title}
            className='w-32 h-44 lg:w-40 lg:h-60 rounded-sm lg:rounded-md object-cover shadow-xl hover:opacity-80 transition-opacity duration-200 cursor-pointer'
          />
        </Link>

        {/* Content */}
        <div className='flex-1 flex flex-col justify-between min-w-0'>
          <div className='flex-1'>
            <Link
              to={`/movie/${movie.id}`}
              tabIndex={0}
              aria-label={`Go to details for ${movie.title}`}
            >
              <h2 className='text-xl sm:text-2xl lg:text-2xl font-bold text-white mb-2 line-clamp-2 hover:text-neutral-400 transition-colors duration-200 cursor-pointer'>
                {movie.title}
              </h2>
            </Link>
            <div className='flex items-center gap-2 mb-2'>
              <img
                src='/icon-rating.svg'
                alt='rating'
                className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6'
              />
              <span className='text-white font-semibold text-sm sm:text-md lg:text-lg mt-1'>
                {movie.vote_average.toFixed(1)}/10
              </span>
            </div>
            <p className='text-neutral-300 text-sm sm:text-md lg:text-lg mb-4 line-clamp-2 lg:line-clamp-3 max-w-4xl mt-2 hover:text-neutral-400'>
              {movie.overview}
            </p>
          </div>
          <div className='hidden lg:flex items-center gap-4 mt-1'>
            <TrailerButton
              onClick={onWatchTrailer}
              disabled={!trailerAvailable}
              className='shrink-0'
            />
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className='lg:hidden mt-8'>
        <div className='flex gap-3 items-center'>
          <TrailerButton
            onClick={onWatchTrailer}
            disabled={!trailerAvailable}
            className='flex-1'
          />
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={handleFavoriteToggle}
            className='flex lg:hidden shrink-0'
          />
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
};
