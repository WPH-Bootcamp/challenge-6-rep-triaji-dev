import React, { useMemo } from 'react';
import { useSearch } from '../hooks/useSearch';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/container/MovieCard';
import Button from '../components/ui/Button';
import { VideoModal } from '../components/ui/VideoModal';
import { useTrailer } from '../hooks/useTrailer';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const SearchPage: React.FC = (): React.ReactElement => {
  const [searchParams] = useSearchParams();
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
      className={`layout-px mt-22 md:mt-28.5 min-h-[70vh] flex justify-center ${
        showNotFound || loading ? 'items-center' : 'items-start'
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
          <div className='w-full md:mb-2'>
            <h2 className='text-white text-xl md:text-display-xs font-light'>
              {searchParams.get('person_name') 
                ? <>Movies featuring <span className="text-primary-300 font-semibold">"{searchParams.get('person_name')}"</span></>
                : searchParams.get('q') 
                  ? <>Search Result for <span className="text-primary-300 font-semibold">"{searchParams.get('q')}"</span></>
                  : 'Discover Movies'}
            </h2>
          </div>
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
            <div className='w-full flex-center mb-8'>
              <Button
                variant='secondary'
                className='shadow-2xl w-full'
                onClick={() => loadMoreResults()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
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
