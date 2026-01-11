import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import type { Movie } from '../../types/movie';
import { getImageUrl } from '../../api/movies';
import { IoPlayCircle } from 'react-icons/io5';

interface HeroSectionProps {
  movie: Movie;
  onWatchTrailer: (movieId: number) => void;
}

export const HeroSection = ({ movie, onWatchTrailer }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <div className='relative w-full mb-12 '>
      <div className='relative w-full h-160 md:h-128 lg:h-200'>
        <div className='absolute inset-0 bottom-0 bg-linear-to-t from-black via-black/70 md:via-black/50 to-transparent z-10' />
        <img
          src={getImageUrl(movie.backdrop_path, 'w1280')}
          alt={movie.title}
          className='w-full h-96 md:h-128 lg:h-200 object-cover object-center'
          loading='lazy'
        />
        <div className='absolute top-80 sm:top-70 md:top-85 lg:top-120 left-0 z-20 w-full pb-8 px-4 sm:px-15 lg:px-25 xl:px-35 md:pb-20 text-white max-w-6xl'>
          <div className='flex flex-col h-full'>
            <div className='flex-1'>
              <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold mb-3 drop-shadow-lg leading-tight'>
                {movie.title}
              </h1>
              <p className='text-base md:text-lg text-neutral-400 drop-shadow-md mb-6 leading-relaxed max-w-2xl line-clamp-4'>
                {movie.overview}
              </p>
            </div>
            <div className='flex flex-col gap-3 w-full md:flex-row md:gap-4 shrink-0'>
              <Button
                variant='primary'
                icon={<IoPlayCircle size={24} />}
                onClick={() => onWatchTrailer(movie.id)}
                className='w-full md:w-auto text-base md:text-lg md:min-w-[230px] shrink-0'
              >
                Watch Trailer
              </Button>
              <Button
                variant='secondary'
                onClick={() => navigate(`/movie/${movie.id}`)}
                className='w-full md:w-auto text-base md:text-lg md:min-w-[230px] shrink-0'
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
