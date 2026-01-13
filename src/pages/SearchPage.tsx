import React, { useMemo } from 'react';
import { useSearch } from '../hooks/useSearch';
import MovieCard from '../components/container/MovieCard';
import Button from '../components/ui/Button';
import { VideoModal } from '../components/ui/VideoModal';
import { useTrailer } from '../hooks/useTrailer';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const SearchPage: React.FC = (): React.ReactElement => {
  const {
    searchResults,
    loading,
    error,
    hasMoreResults,
    loadMoreResults,
    isFetchingNextPage,
  } = useSearch();
  
  const { trailerKey, isModalOpen, isLoading, handleWatchTrailer, closeModal } =
    useTrailer();

  const allMovies = useMemo(() => {
    if (!searchResults) return [];
    return searchResults.pages.flatMap((page) => page.results);
  }, [searchResults]);

  const showNotFound =
    allMovies.length === 0 && !loading && !error;

  const filteredResults = allMovies.filter((movie) => movie.vote_average > 1);

  return (
    <div
      className={`px-4 sm:px-15 lg:px-25 xl:px-35 mt-20 min-h-[80vh] flex justify-center ${
        showNotFound ? 'items-center' : 'items-start'
      }`}
    >
      {loading && <LoadingSpinner className="h-60" />}
      {error && <p className='text-red-500'>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>}
      {showNotFound && (
        <div className='flex flex-col items-center justify-center'>
          <img
            src='/icons/data-not-found.svg'
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
            {filteredResults.map((movie) => (
              <MovieCard
                key={`${movie.id}-${movie.original_title}`}
                movie={movie}
                variant='large'
                onWatchTrailer={handleWatchTrailer}
                trailerAvailable={!isLoading}
              />
            ))}
          </div>
          {hasMoreResults && (
            <div className='w-full flex items-center justify-center mt-6'>
              <Button
                variant='secondary'
                className='shadow-2xl'
                onClick={() => loadMoreResults()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Loading more...' : 'Load More'}
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

export default SearchPage;
