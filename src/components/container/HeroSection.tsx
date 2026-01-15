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
    <div className='relative w-full mb-4'>
      <div className='relative w-full h-133 xl:h-202.5'>
        <div className='absolute inset-0 bottom-0 bg-linear-to-t from-black via-black/70 md:via-black/50 to-transparent z-10' />
        <img
          src={getImageUrl(movie.backdrop_path, 'w1280')}
          alt={movie.title}
          className='w-full h-full object-cover object-center'
          loading='lazy'
        />
        <div className='absolute top-[clamp(13.75rem,30vw,18.75rem)] left-0 z-20 w-full layout-px text-white max-w-6xl'>
          <div className='flex flex-col h-full'>
            <div className='flex-1'>
              <h1 className='text-display-xs sm:text-display-md md:text-display-lg lg:text-display-2xl font-bold mb-4 drop-shadow-lg leading-tight'>
                {movie.title}
              </h1>
              <p className='text-sm md:text-lg text-neutral-400 drop-shadow-md mb-12 leading-relaxed max-w-2xl line-clamp-5 md:line-clamp-3'>
                {movie.overview}
              </p>
            </div>
            <div className='flex flex-col gap-3 w-full md:flex-row md:gap-4 shrink-0'>
              <Button
                variant='primary'
                icon={<IoPlayCircle size={24} />}
                onClick={() => onWatchTrailer(movie.id)}
                className='w-full md:w-auto text-md md:text-lg md:min-w-[230px] shrink-0'
              >
                Watch Trailer
              </Button>
              <Button
                variant='secondary'
                onClick={() => navigate(`/movie/${movie.id}`)}
                className='w-full md:w-auto text-md md:text-lg md:min-w-[230px] shrink-0'
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
