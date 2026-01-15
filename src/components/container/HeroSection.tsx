import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import type { Movie } from '../../types/movie';
import { getImageUrl } from '../../api/movies';
import { IoPlayCircle } from 'react-icons/io5';
import LoadingSpinner from '../ui/LoadingSpinner';

interface HeroSectionProps {
  movie: Movie;
  onWatchTrailer: (movieId: number) => void;
}

export const HeroSection = ({ movie, onWatchTrailer }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className='relative mb-4 w-full'>
      <div className='relative h-133 w-full xl:h-202.5'>
        <div className='absolute inset-0 bottom-0 z-10 bg-linear-to-t from-black via-black/70 to-transparent md:via-black/50' />
        {!isLoaded && (
          <LoadingSpinner className='absolute inset-0 z-0 bg-neutral-900' />
        )}
        <img
          src={getImageUrl(movie.backdrop_path, 'w1280')}
          alt={movie.title}
          className={`h-full w-full object-cover object-center transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading='lazy'
          onLoad={() => setIsLoaded(true)}
        />
        <div className='layout-px absolute top-[clamp(13.75rem,30vw,18.75rem)] left-0 z-20 w-full max-w-6xl text-white'>
          <div className='flex h-full flex-col'>
            <div className='flex-1'>
              <h1 className='text-display-xs sm:text-display-md md:text-display-lg lg:text-display-2xl mb-4 leading-tight font-bold drop-shadow-lg'>
                {movie.title}
              </h1>
              <p className='mb-12 line-clamp-5 max-w-2xl text-sm leading-relaxed text-neutral-400 drop-shadow-md md:line-clamp-3 md:text-lg'>
                {movie.overview}
              </p>
            </div>
            <div className='flex w-full shrink-0 flex-col gap-3 md:flex-row md:gap-4'>
              <Button
                variant='primary'
                icon={<IoPlayCircle size={24} />}
                onClick={() => onWatchTrailer(movie.id)}
                className='text-md w-full shrink-0 md:w-auto md:min-w-[230px] md:text-lg'
              >
                Watch Trailer
              </Button>
              <Button
                variant='secondary'
                onClick={() => navigate(`/movie/${movie.id}`)}
                className='text-md w-full shrink-0 md:w-auto md:min-w-[230px] md:text-lg'
              >
                See Detail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
