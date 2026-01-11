import React, { useState } from 'react';
import { useFavorite } from './useFavorite';
import { MovieCard } from '../../container/MovieCard/MovieCard';
import Button from '../../ui/Button';
import { VideoModal } from '../../ui/Video/VideoModal';
import { useTrailer } from '../../../hooks/useTrailer';

const Favoritepage: React.FC = () => {
  const { favoriteMovies, loading, handleRemoveFromFavorites } = useFavorite();
  const [visibleCount, setVisibleCount] = useState(5);
  const { trailerKey, isModalOpen, isLoading, handleWatchTrailer, closeModal } =
    useTrailer();

  const showNotFound = favoriteMovies.length === 0 && !loading;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className='px-4 sm:px-15 lg:px-25 xl:px-35 mt-30 min-h-[80vh]'>
      <div className='text-2xl md:text-3xl font-bold'>Favorites</div>
      {loading && <p>Loading...</p>}
      {showNotFound && (
        <div className='flex flex-col items-center justify-center'>
          <img
            src='/data-not-foundpng.png'
            alt='No Favorite Movies'
            className='w-[200px] h-[200px] mb-6 mt-40'
          />
          <div className='text-md font-semibold text-white mb-2'>
            No Favorite Movies
          </div>
          <div className='text-md font-normal text-neutral-400'>
            Add some movies to your favorites
          </div>
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
                onWatchTrailer={() => handleWatchTrailer(movie.id)}
                trailerAvailable={!isLoading}
                onRemoveFromFavorites={() =>
                  handleRemoveFromFavorites(movie.id)
                }
              />
            ))}
          </div>
          {visibleCount < favoriteMovies.length && (
            <div className='w-full flex items-center justify-center mt-6'>
              <Button
                variant='secondary'
                className='shadow-2xl'
                onClick={handleLoadMore}
                disabled={loading}
              >
                Load More
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

export default Favoritepage;
