import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../api/movies';
import type { MovieCardProps } from '../../types/movie';
import { useFavoriteToggle } from '../../hooks/useFavoriteToggle';
import FavoriteButton from '../ui/FavoriteButton';
import LoadingSpinner from '../ui/LoadingSpinner';
import Skeleton from '../ui/Skeleton';
import { useMovieTrailer } from '../../hooks/useMovies';
import TrailerButton from '../ui/TrailerButton';

const MovieCardLarge: React.FC<MovieCardProps> = ({
  movie,
  onWatchTrailer,
  onImageLoad,
  children,
}) => {
  const { isFavorite, handleFavoriteToggle } = useFavoriteToggle({
    movieId: movie.id,
    movieData: movie,
  });

  const { data: trailerKey, isLoading: isLoadingTrailer } = useMovieTrailer(movie.id);

  const [isImageLoaded, setIsImageLoaded] = React.useState(false);

  const handleWatchTrailerClick = React.useCallback(() => {
    onWatchTrailer?.(movie.id, trailerKey || undefined);
  }, [onWatchTrailer, movie.id, trailerKey]);

  return (
    <div className='relative flex flex-col mb-0 lg:mb-8 mt-8 lg:mt-12 w-full border-b border-neutral-800 last:border-b-0 pb-4 lg:pb-12'>
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
          tabIndex={!isImageLoaded ? -1 : 0}
          aria-label={`Go to details for ${movie.title}`}
          className={`shrink-0 mr-4 lg:mr-6 ${
            !isImageLoaded ? 'pointer-events-none cursor-default' : ''
          }`}
        >
          <div className='relative w-26 h-39 lg:w-45 lg:h-67.5 rounded-sm lg:rounded-md bg-neutral-800 shadow-xl overflow-hidden'>
            {!isImageLoaded && (
              <LoadingSpinner className='absolute inset-0 w-full h-full z-10 bg-neutral-900' size="medium" />
            )}
            <img
              src={
                movie.poster_path
                  ? getImageUrl(movie.poster_path)
                  : '/icons/data-not-found.svg'
              }
              alt={movie.title}
              className={`w-full h-full object-cover hover:opacity-80 transition-opacity duration-200 cursor-pointer ${
                !isImageLoaded ? 'opacity-0' : 'opacity-100'
              }`}
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
        </Link>

        {/* Content */}
        <div className='flex-1 flex flex-col justify-between min-w-0'>
          <div className='flex-1 pr-0 lg:pr-45'>
            <Link
              to={`/movie/${movie.id}`}
              tabIndex={!isImageLoaded ? -1 : 0}
              aria-label={`Go to details for ${movie.title}`}
              className={
                !isImageLoaded ? 'pointer-events-none cursor-default' : ''
              }
            >
              {!isImageLoaded ? (
                <Skeleton className='h-8 w-1/2 mb-3 ' />
              ) : (
                <h2 className='text-lg sm:text-xl md:text-display-xs font-semibold text-white mb-2 md:mb-3 line-clamp-2 hover:text-neutral-400 transition-colors duration-200 cursor-pointer'>
                  {movie.title}
                </h2>
              )}
            </Link>
            <div className='flex items-center gap-2 mb-2 md:mb-3'>
              {!isImageLoaded ? (
                <div className='flex items-center gap-2 w-full'>
                  <Skeleton className='w-6 h-6 rounded-full' />
                  <Skeleton className='h-6 w-16' />
                </div>
              ) : (
                <>
                  <img
                    src='/icons/icon-rating.svg'
                    alt='rating'
                    className='w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6'
                  />
                  <span className='text-white text-sm sm:text-md lg:text-lg'>
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </>
              )}
            </div>
            {!isImageLoaded ? (
              <div className='mt-2 mb-4'>
                <Skeleton className='h-4 w-full mb-1' />
                <Skeleton className='h-4 w-5/6 mb-1' />
                <Skeleton className='h-4 w-4/6' />
              </div>
            ) : (
              <p className='text-neutral-400 text-xs sm:text-sm lg:text-md mb-4 line-clamp-2 max-w-4xl mt-2 hover:text-neutral-500'>
                {movie.overview}
              </p>
            )}
          </div>
          <div className='hidden lg:flex items-center gap-4 mt-1'>
            {!isImageLoaded ? (
              <>
                <Skeleton className='h-11 lg:h-13 w-40 rounded-full' />
                {children}
              </>
            ) : (
              <>
                <TrailerButton
                  isLoading={isLoadingTrailer}
                  hasTrailer={!!trailerKey}
                  onClick={handleWatchTrailerClick}
                  className='lg:w-auto w-full px-7 py-3 h-11 lg:h-auto'
                />
                {children}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className='lg:hidden mt-8'>
        <div className='flex gap-4 items-center'>
          {!isImageLoaded ? (
            <>
              <Skeleton className='flex-1 h-11 rounded-full' />
              <Skeleton className='w-11 h-11 rounded-full' />
            </>
          ) : (
            <>
              <TrailerButton
                isLoading={isLoadingTrailer}
                hasTrailer={!!trailerKey}
                onClick={handleWatchTrailerClick}
                className='flex-1 px-7 py-3 h-11 w-auto shadow-md'
              />
              <FavoriteButton
                isFavorite={isFavorite}
                onClick={handleFavoriteToggle}
                className='flex lg:hidden shrink-0'
              />
            </>
          )}
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
};

export default React.memo(MovieCardLarge);
