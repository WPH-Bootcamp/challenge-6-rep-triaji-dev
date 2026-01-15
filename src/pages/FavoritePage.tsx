import React, { useState } from 'react';
import { useFavorite } from '../hooks/useFavorite';
import MovieCard from '../components/container/MovieCard';
import Button from '../components/ui/Button';
import { VideoModal } from '../components/ui/VideoModal';
import { useTrailer } from '../hooks/useTrailer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const FavoritePage: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const { favoriteMovies, loading } = useFavorite();
  const [visibleCount, setVisibleCount] = useState(5);
  const { trailerKey, isModalOpen, isLoading, handleWatchTrailer, closeModal } =
    useTrailer();

  const showNotFound = favoriteMovies.length === 0 && !loading;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className='layout-px mt-22 md:mt-28.5 min-h-[70vh]'>
      <div className='text-display-xs md:text-display-md font-bold'>Favorites</div>
      {loading && <LoadingSpinner className="h-60" />}
      {showNotFound && (
        <div className='flex flex-col items-center justify-center'>
          <img
            src='/icons/data-empty.svg'
            alt='No Favorite Movies'
            className='h-[170px] mb-6 mt-26'
          />
          <div className='text-md font-semibold text-white mb-2'>
            Data Empty
          </div>
          <div className='text-md font-normal text-neutral-400'>
            You don't have a favorite movie yet
          </div>
          <Button variant='primary' className='mt-6'                 
           onClick={() => navigate(`/`)}>
            Explore Movie
          </Button>
        </div>
      )}
      {favoriteMovies.length > 0 && (
        <div className='w-full flex flex-col items-center'>
          <div className='w-full [&>*:last-child]:border-b-0'>
            {favoriteMovies.slice(0, visibleCount).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                variant='large'
                onWatchTrailer={handleWatchTrailer}
                trailerAvailable={!isLoading}
              />
            ))}
          </div>
          {visibleCount < favoriteMovies.length && (
            <div className='w-full flex-center mb-8'>
              <Button
                variant='secondary'
                className='shadow-2xl w-full'
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </div>
      )}
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoId={trailerKey || ''}
      />
    </div>
  );
};

export default FavoritePage;
