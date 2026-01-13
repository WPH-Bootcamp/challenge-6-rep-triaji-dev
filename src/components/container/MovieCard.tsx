import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getImageUrl } from '../../api/movies';
import type { MovieCardProps } from '../../types/movie';
import { IoPlayCircle } from 'react-icons/io5';
import { useFavoriteToggle } from '../../hooks/useFavoriteToggle';
import FavoriteButton from '../ui/FavoriteButton';
import Button from '../ui/Button';



const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  variant = 'compact',
  size = 'medium',
  trendingRank = 0,
  onWatchTrailer,
  trailerAvailable = true,
  children,
}): React.ReactElement => {
  const navigate = useNavigate();
  const { isFavorite, handleFavoriteToggle } = useFavoriteToggle({
    movieId: movie.id,
    movieData: movie,
  });
  
  const handleWatchTrailerClick = React.useCallback(() => {
    onWatchTrailer?.(movie.id);
  }, [onWatchTrailer, movie.id]);

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
        <div className='relative overflow-hidden rounded-lg aspect-2/3 mb-2'>
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
    <div className='relative flex flex-col mb-0 lg:mb-16 mt-12 w-full border-b border-neutral-800 last:border-b-0 pb-12'>
      <FavoriteButton
        size='large'
        isFavorite={isFavorite}
        onClick={handleFavoriteToggle}
        className='absolute right-0 lg:flex hidden z-10'
      />

      <div className='flex flex-row lg:items-start rounded-2xl'>
        {/* Poster */}
        <Link
          to={`/movie/${movie.id}`}
          tabIndex={0}
          aria-label={`Go to details for ${movie.title}`}
          className='shrink-0 mr-4 lg:mr-8'
        >
          <img
            src={
              movie.poster_path
                ? getImageUrl(movie.poster_path)
                : '/icons/data-not-found.svg'
            }
            alt={movie.title}
            className='w-32 h-44 lg:w-45 lg:h-67.5 rounded-sm lg:rounded-md object-cover shadow-xl hover:opacity-80 transition-opacity duration-200 cursor-pointer'
          />
        </Link>

        {/* Content */}
        <div className='flex-1 flex flex-col justify-between min-w-0'>
          <div className='flex-1 pr-0 lg:pr-45'>
            <Link
              to={`/movie/${movie.id}`}
              tabIndex={0}
              aria-label={`Go to details for ${movie.title}`}
            >
              <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3 line-clamp-2 hover:text-neutral-400 transition-colors duration-200 cursor-pointer'>
                {movie.title}
              </h2>
            </Link>
            <div className='flex items-center gap-2 mb-2 md:mb-3'>
              <img
                src='/icons/icon-rating.svg'
                alt='rating'
                className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6'
              />
              <span className='text-white text-sm sm:text-md lg:text-lg'>
                {movie.vote_average.toFixed(1)}/10
              </span>
            </div>
            <p className='text-neutral-400 text-xs sm:text-sm lg:text-md mb-4 line-clamp-4 md:line-clamp-3 max-w-4xl mt-2 hover:text-neutral-500'>
              {movie.overview}
            </p>
          </div>
          <div className='hidden lg:flex items-center gap-4 mt-1'>
            <Button
              variant='primary'
              onClick={handleWatchTrailerClick}
              disabled={!trailerAvailable}
              className=''
              icon={<IoPlayCircle size={22} />}
            >
              Watch Trailer
            </Button>
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className='lg:hidden mt-8'>
        <div className='flex gap-3 items-center'>
          <Button
            variant='primary'
            onClick={handleWatchTrailerClick}
            disabled={!trailerAvailable}
            className='flex-1 px-7 py-3 h-11 w-auto shadow-md text-white'
            icon={<IoPlayCircle size={22} />}
          >
            Watch Trailer
          </Button>
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

export default React.memo(MovieCard);