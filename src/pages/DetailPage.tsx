import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { DetailPageSkeleton } from '../components/container/skeleton/DetailPageSkeleton';
import {
  useMovieDetails,
  useMovieCredits,
  useMovieTrailer,
  useGenres,
} from '../hooks/useMovies';
import { getImageUrl } from '../api/movies';
import Button from '../components/ui/Button';
import { IoPlayCircle } from 'react-icons/io5';
import { VideoModal } from '../components/ui/VideoModal';
import { CastCard } from '../components/container/CastCard';
import InfoCard from '../components/ui/InfoCard';
import { useTrailer } from '../hooks/useTrailer';
import { useFavoriteToggle } from '../hooks/useFavoriteToggle';
import FavoriteButton from '../components/ui/FavoriteButton';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useScreenSize } from '../hooks/useScreenSize';
import type { Movie } from '../types/movie';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);
  
  const [isBackdropLoaded, setIsBackdropLoaded] = React.useState(false);
  const [isPosterLoaded, setIsPosterLoaded] = React.useState(false);

  const { data: movie, isLoading: loadingMovie, error: errorMovie } = useMovieDetails(movieId);
  const { data: credits, isLoading: loadingCredits } = useMovieCredits(movieId);
  const { data: genresData } = useGenres();
  
  const { data: trailerKey, isLoading: isLoadingTrailer } = useMovieTrailer(movieId);
  
  const { isModalOpen, handleWatchTrailer, closeModal, isLoading: trailerLoading } = useTrailer();

  const { isFavorite, handleFavoriteToggle } = useFavoriteToggle({
    movieId: movie?.id || 0,
    movieData: movie as Movie,
  });

  const { isMobile } = useScreenSize();

  const cast = useMemo(() => credits?.cast.slice(0, 5) || [], [credits]);
  const crew = useMemo(() => credits?.crew.slice(0, 5) || [], [credits]);

  const genreNames = useMemo(() => {
    if (!movie || !genresData?.genres) return ['-'];
    return movie.genres?.map((g) => g.name) || ['-'];
  }, [movie, genresData]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loadingMovie || loadingCredits || isLoadingTrailer) return <DetailPageSkeleton />;
  if (!movie) return <div className='text-center py-20 bg-black text-white min-h-screen'>Movie not found.</div>;
  if (errorMovie) return <div className='text-center py-20 text-red-500 bg-black min-h-screen'>Error loading details</div>;

  const ageLimit = 13;

  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>
      {/* Background Image */}
      <div className='relative w-full h-100 md:h-160 lg:h-200'>
        {!isBackdropLoaded && <LoadingSpinner className='absolute inset-0 w-full h-full bg-linear-to-b from-neutral-900 via-neutral-950/50 to-transparent z-10' size="large" />}
        <img
          src={getImageUrl(movie.backdrop_path, 'w1280')}
          alt={movie.title}
          className={`w-full h-full object-cover object-[center_top] md:object-[center_top] lg:object-[center_top] object-position-top-center transition-opacity duration-500 ${
            !isBackdropLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ objectPosition: 'top center' }}
          onLoad={() => setIsBackdropLoaded(true)}
        />
        <div className='absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent' />
      </div>

      {/* Main Content */}
      <div className=' -mt-33 z-10 relative layout-px pb-12 -translate-y-4 md:-translate-y-32 lg:-translate-y-64'>
        <div className='max-w-9xl mx-auto'>
          <div className='grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[292px_1fr] mb-6 md:mb-12'>
            {/* Poster */}
            <div className='row-span-2 md:col-span-1 mb-6 md:mb-0'>
              <div className='rounded-md md:rounded-xl overflow-hidden flex items-center shadow-2xl shrink-0 relative bg-neutral-800 aspect-2/3 w-[116px] h-[171px] md:w-[260px] md:h-[384px]'>
                {!isPosterLoaded && <LoadingSpinner className='absolute inset-0 w-full h-full z-10 bg-neutral-900' size="medium" />}
                <img
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  className={`w-full h-full object-cover rounded-md md:rounded-xl transition-opacity duration-300 ${
                    !isPosterLoaded ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={() => setIsPosterLoaded(true)}
                />
              </div>
            </div>

            {/* Content Section */}
            <div className='md:col-span-2'>
              {/* Title */}
              <div className='mb-6 md:mb-0'>
                <h1 className='text-xl sm:text-display-md md:text-display-lg lg:text-display-xl font-bold'>
                  {movie.title}
                </h1>
                <div className='flex items-center gap-2 text-sm md:text-md font-medium mt-4'>
                  <img
                    src='/icons/icon-calendar.svg'
                    alt='calendar'
                    className='w-6 h-6'
                  />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
              </div>
            </div>

            <div className='col-span-2 md:col-span-2 md:col-start-2'>
              {/* Buttons */}
              <div className='mb-6'>
                <div className='flex-between sm:flex-start gap-4'>
                  {trailerKey && (
                    <Button
                      variant='primary'
                      icon={<IoPlayCircle size={24} />}
                      onClick={() =>
                        handleWatchTrailer(movie.id, trailerKey || undefined)
                      }
                      disabled={trailerLoading}
                      className='rounded-full px-10 py-3 text-md font-bold bg-primary-300 hover:bg-primary-400 border-none flex-1 w-auto md:flex-none md:w-64 shadow-lg'
                    >
                      {trailerLoading ? 'Loading...' : 'Watch Trailer'}
                    </Button>
                  )}
                  <FavoriteButton
                    isFavorite={isFavorite}
                    onClick={handleFavoriteToggle}
                    size={isMobile ? 'medium' : 'large'}
                  />
                </div>
              </div>

              {/* Info Cards */}
              <div className='grid grid-cols-3 gap-3 md:gap-5 max-w-4xl'>
                <InfoCard
                  icon='/icons/icon-rating.svg'
                  label='Rating'
                  value={`${movie.vote_average.toFixed(1)}/10`}
                />
                <InfoCard
                  icon='/icons/icon-genre.svg'
                  label='Genre'
                  value={genreNames[0]}
                />
                <InfoCard
                  icon='/icons/icon-age-limit.svg'
                  label='Age Limit'
                  value={ageLimit}
                />
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className='mb-6 md:mb-12'>
            <h2 className='text-xl md:text-display-xs lg:text-display-md font-bold mb-2'>
              Overview
            </h2>
            <p className='text-neutral-400 text-xs md:text-sm lg:text-md leading-relaxed'>
              {movie.overview}
            </p>
          </div>

          {/* Cast & Crew */}
          <div className=''>
            <h2 className='text-xl md:text-display-xs lg:text-display-md font-bold mb-4 md:mb-6'>
              Cast & Crew
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-10'>
              {cast.map((member) => (
                <CastCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  role={member.character}
                  profilePath={member.profile_path}
                />
              ))}
              {crew.map((member) => (
                <CastCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  role={member.job}
                  profilePath={member.profile_path}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoId={trailerKey || ''}
      />
    </div>
  );
};

export default DetailPage;
