import React, { useState } from 'react';
import { useSearch } from './useSearch';
import { MovieCard } from '../../container/MovieCard/MovieCard';
import Button from '../../ui/Button';
import { VideoModal } from '../../ui/Video/VideoModal';
import { useTrailer } from '../../../hooks/useTrailer';

const Searchpage: React.FC = () => {
  const { searchResults, loading, error } = useSearch();
  const [visibleCount, setVisibleCount] = useState(5);
  const { trailerKey, isModalOpen, isLoading, handleWatchTrailer, closeModal } =
    useTrailer();

  const showNotFound =
    searchResults && searchResults.results.length === 0 && !loading && !error;

  const filteredResults = searchResults
    ? searchResults.results.filter((movie) => movie.vote_average > 1)
    : [];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div
      className={`px-4 sm:px-15 lg:px-25 xl:px-35 mt-20 min-h-[80vh] flex justify-center ${
        showNotFound ? 'items-center' : 'items-start'
      }`}
    >
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {showNotFound && (
        <div className='flex flex-col items-center justify-center'>
          <img
            src='/data-not-foundpng.png'
            alt='Data Not Found'
            className='w-[200px] h-[200px] mb-6'
          />
          <div className='text-md font-semibold text-white mb-2'>
            Data Not Found
          </div>
          <div className='text-md font-normal text-neutral-400'>
            Try other keywords
          </div>
        </div>
      )}
      {filteredResults.length > 0 && (
        <div className='w-full flex flex-col items-center'>
          <div className='w-full [&>*:last-child]:border-b-0'>
            {filteredResults.slice(0, visibleCount).map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                variant='large'
                onWatchTrailer={() => handleWatchTrailer(movie.id)}
                trailerAvailable={!isLoading}
              />
            ))}
          </div>
          {visibleCount < filteredResults.length && (
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

export default Searchpage;
