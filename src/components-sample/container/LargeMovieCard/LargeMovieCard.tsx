import React, { useState, useEffect } from 'react';
import { IoPlayCircle } from 'react-icons/io5';
import { getImageUrl } from '../../../services/movies/services';
import { Link } from 'react-router-dom';
import {
  isMovieFavorited,
  addToFavorites,
  removeFromFavorites,
} from '../../pages/favoritepage/helper';
import toast from 'react-hot-toast';

interface LargeMovieCardProps {
  posterPath: string | null;
  title: string;
  voteAverage: number;
  overview: string;
  onWatchTrailer?: () => void;
  trailerAvailable?: boolean;
  children?: React.ReactNode;
  id: number;
  onRemoveFromFavorites?: () => void;
  releaseDate?: string;
}

const LargeMovieCard: React.FC<LargeMovieCardProps> = ({
  posterPath,
  title,
  voteAverage,
  overview,
  onWatchTrailer,
  trailerAvailable = true,
  children,
  id,
  onRemoveFromFavorites,
  releaseDate = '',
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(isMovieFavorited(id));
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(id);
      onRemoveFromFavorites?.();
      toast.success('Removed from favorites');
    } else {
      addToFavorites({
        id,
        title,
        poster_path: posterPath,
        overview,
        vote_average: voteAverage,
        release_date: releaseDate,
        backdrop_path: null,
      });
      toast.success('Added to favorites');
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className='relative flex flex-col mb-0 md:mb-16 mt-8 w-full border-b border-neutral-800 last:border-b-0 pb-8'>
      {/* Favorite Button - Desktop Only */}
      <button
        aria-label='Favorite'
        className='absolute top-6 right-6 w-12 h-12 md:flex hidden items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/60 shadow-lg transition-colors duration-200 z-10'
        onClick={handleFavoriteClick}
      >
        <img
          src={isFavorite ? '/icon-fav-on.svg' : '/icon-fav-off.svg'}
          alt='favorite'
          className='w-6 h-6 cursor-pointer'
        />
      </button>

      <div className='flex flex-row md:items-start p-4 md:px-8 rounded-2xl'>
        {/* Poster */}
        <Link
          to={`/movie/${id}`}
          tabIndex={0}
          aria-label={`Go to details for ${title}`}
          className='flex-shrink-0 mr-4 md:mr-8'
        >
          <img
            src={
              posterPath ? getImageUrl(posterPath) : '/data-not-foundpng.png'
            }
            alt={title}
            className='w-32 h-44 md:w-40 md:h-60 rounded-sm md:rounded-md object-cover shadow-xl hover:opacity-80 transition-opacity duration-200 cursor-pointer'
          />
        </Link>

        {/* Content */}
        <div className='flex-1 flex flex-col justify-between min-w-0'>
          <div className='flex-1'>
            <Link
              to={`/movie/${id}`}
              tabIndex={0}
              aria-label={`Go to details for ${title}`}
            >
              <h2 className='text-2xl font-bold text-white mb-2 line-clamp-2 hover:text-neutral-400 transition-colors duration-200 cursor-pointer'>
                {title}
              </h2>
            </Link>
            <div className='flex items-center gap-2 mb-2'>
              <img src='/icon-rating.svg' alt='rating' className='w-5 h-5' />
              <span className='text-white font-semibold text-base'>
                {voteAverage.toFixed(1)}/10
              </span>
            </div>
            <p className='text-neutral-300 text-base mb-4 line-clamp-2 md:line-clamp-3 max-w-4xl'>
              {overview}
            </p>
          </div>
          <div className='hidden md:flex items-center gap-4 mt-4'>
            <button
              className='bg-primary-300 hover:bg-primary-400 text-white font-semibold rounded-full px-7 py-3 flex items-center gap-2 text-base shadow-md transition-colors duration-200 cursor-pointer shrink-0'
              onClick={onWatchTrailer}
              disabled={!trailerAvailable}
            >
              Watch Trailer <IoPlayCircle size={22} />
            </button>
            {children}
          </div>
        </div>
      </div>

      <div className='md:hidden mt-8'>
        <div className='flex gap-3 items-center'>
          <button
            className='flex-1 bg-primary-300 hover:bg-primary-400 text-white font-semibold rounded-full px-7 py-3 flex items-center justify-center gap-2 text-base shadow-md transition-colors duration-200 cursor-pointer'
            onClick={onWatchTrailer}
            disabled={!trailerAvailable}
          >
            Watch Trailer <IoPlayCircle size={22} />
          </button>
          {/* Favorite Button - Mobile Only */}
          <button
            aria-label='Favorite'
            className='w-12 h-12 flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/60 shadow-lg transition-colors duration-200 shrink-0'
            onClick={handleFavoriteClick}
          >
            <img
              src={isFavorite ? '/icon-fav-on.svg' : '/icon-fav-off.svg'}
              alt='favorite'
              className='w-6 h-6 cursor-pointer'
            />
          </button>
        </div>
        <div className='mt-4'>{children}</div>
      </div>
    </div>
  );
};

export default LargeMovieCard;
