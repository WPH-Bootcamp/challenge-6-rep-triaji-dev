import React, { useMemo, useEffect } from 'react';
import { useTrendingMovies, useNewReleaseMoviesInfinite } from '../hooks/useMovies';
import { getImageUrl } from '../api/movies';
import Button from '../components/ui/Button';
import { HeroSlider } from '../components/container/HeroSlider';
import MovieCard from '../components/container/MovieCard';
import { HeroSection } from '../components/container/HeroSection';
import { Carousel } from '../components/container/Carousel';
import { useTrailer } from '../hooks/useTrailer';
import { VideoModal } from '../components/ui/VideoModal';
import MovieCardSkeleton from '../components/container/MovieCardSkeleton';
import { HeroSectionSkeleton } from '../components/container/HeroSectionSkeleton';

export const HomePage: React.FC = (): React.ReactElement => {
  const { 
    data: trendingData, 
    isLoading: trendingLoading, 
    error: trendingError 
  } = useTrendingMovies();

  const {
    data: newReleaseData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: newReleaseLoading,
    error: newReleaseError
  } = useNewReleaseMoviesInfinite();

  const { 
    trailerKey, 
    isModalOpen, 
    isLoading: trailerLoading, 
    handleWatchTrailer, 
    closeModal 
  } = useTrailer();

  const trendingMovies = useMemo(() => {
    return trendingData?.results.slice(0, 10) || [];
  }, [trendingData]);

  const newReleaseMovies = useMemo(() => {
    return newReleaseData?.pages.flatMap((page) => page.results) || [];
  }, [newReleaseData]);

  const error = trendingError || newReleaseError;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (error) return <div className="bg-black min-h-screen text-white p-8">Error: {error instanceof Error ? error.message : 'Unknown error'}</div>;

  return (
    <div className='mx-auto bg-black min-h-screen text-white pb-20'>
      {/* Hero Section */}
      {trendingLoading ? (
        <HeroSectionSkeleton />
      ) : trendingMovies.length > 0 ? (
        <HeroSlider 
          items={trendingMovies} 
          paused={isModalOpen}
          getImageUrl={(movie) => getImageUrl(movie.backdrop_path, 'w1280')}
        >
          {(movie) => <HeroSection key={movie.id} movie={movie} onWatchTrailer={handleWatchTrailer} />}
        </HeroSlider>
      ) : null}

      {/* Trending Now */}
      <section className='px-4 sm:px-15 lg:px-25 xl:px-35 mb-8 md:mb-12'>
        <div className='flex items-center justify-between mb-4 md:mb-6 md:mt-40 lg:mt-0 '>
          <h2 className='text-xl md:text-2xl lg:text-3xl font-bold pb-2 lg:pb-8'>
            Trending Now
          </h2>
        </div>
        {trendingLoading ? (
            <div className="flex gap-3 md:gap-4 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="shrink-0 w-[calc((100%-12px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)] xl:w-[calc((100%-64px)/5)]">
                        <MovieCardSkeleton variant="compact" />
                    </div>
                ))}
            </div>
        ) : (
            <Carousel movies={trendingMovies.slice(0, 20)} />
        )}
      </section>

      {/* New Release */}
      <section className='px-4 sm:px-15 lg:px-25 xl:px-35'>
        <div className='relative'>
          <h2 className='text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 pb-2 lg:pb-8'>
            New Release
          </h2>
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'>
            {newReleaseMovies.map((movie) => (
              <MovieCard 
                key={`new-${movie.id}`} 
                movie={movie} 
                size='large' 
                onWatchTrailer={handleWatchTrailer}
                trailerAvailable={!trailerLoading}
              />
            ))}
            {(newReleaseLoading || isFetchingNextPage) && (
                [...Array(10)].map((_, i) => (
                    <MovieCardSkeleton key={`skeleton-${i}`} variant="compact" />
                ))
            )}
          </div>
          {hasNextPage && (
            <div
              className='w-full h-[150px] md:h-[300px] absolute bottom-0 left-0 bg-linear-to-t from-black via-black/80 to-transparent flex items-center justify-center z-50 transition-all duration-300 hover:from-black/90 hover:via-black/90 active:from-black active:via-black/95 cursor-pointer'
              onClick={() => {
                fetchNextPage();
              }}
            >
              <Button
                variant='secondary'
                className='translate-y-5 md:translate-y-10 shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95'
                disabled={isFetchingNextPage}
                onClick={(e) => {
                  e.stopPropagation();
                  fetchNextPage();
                }}
              >
                {isFetchingNextPage ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </div>
      </section>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoId={trailerKey || ''}
      />
    </div>
  );
};

export default HomePage;

