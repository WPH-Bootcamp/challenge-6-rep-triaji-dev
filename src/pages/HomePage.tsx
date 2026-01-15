import React, { useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  useTrendingMovies,
  useNewReleaseMoviesInfinite,
} from '../hooks/useMovies';
import { getImageUrl } from '../api/movies';
import Button from '../components/ui/Button';
import { HeroSlider } from '../components/container/HeroSlider';
import MovieCard from '../components/container/MovieCard';
import { HeroSection } from '../components/container/HeroSection';
import { Carousel } from '../components/container/MovieCarousel';
import { useTrailer } from '../hooks/useTrailer';
import { VideoModal } from '../components/ui/VideoModal';
import MovieCardSkeleton from '../components/container/skeleton/MovieCardSkeleton';
import { HeroSectionSkeleton } from '../components/container/skeleton/HeroSectionSkeleton';
import ErrorState from '../components/ui/ErrorState';

export const HomePage: React.FC = (): React.ReactElement => {
  const {
    data: trendingData,
    isLoading: trendingLoading,
    error: trendingError,
  } = useTrendingMovies();

  const {
    data: newReleaseData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: newReleaseLoading,
    error: newReleaseError,
  } = useNewReleaseMoviesInfinite();

  const {
    trailerKey,
    isModalOpen,
    isLoading: trailerLoading,
    handleWatchTrailer,
    closeModal,
  } = useTrailer();

  const trendingMovies = useMemo(() => {
    return trendingData?.results.slice(0, 10) || [];
  }, [trendingData]);

  const newReleaseMovies = useMemo(() => {
    return newReleaseData?.pages.flatMap((page) => page.results) || [];
  }, [newReleaseData]);

  const [loadedImageIds, setLoadedImageIds] = React.useState<Set<number>>(
    new Set()
  );

  const handleImageLoad = React.useCallback((id: number) => {
    setLoadedImageIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  }, []);

  const allImagesLoaded = React.useMemo(() => {
    if (newReleaseMovies.length === 0) return true;
    return newReleaseMovies.every((movie) => loadedImageIds.has(movie.id));
  }, [newReleaseMovies, loadedImageIds]);

  const error = trendingError || newReleaseError;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && allImagesLoaded) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, allImagesLoaded]);

  if (error)
    return (
      <ErrorState
        message={error instanceof Error ? error.message : 'Unknown error'}
        onRetry={() => window.location.reload()}
        className='min-h-screen'
      />
    );

  return (
    <div className='mx-auto min-h-screen overflow-x-hidden bg-black pb-20 text-white'>
      {/* Hero Section */}
      {trendingLoading ? (
        <HeroSectionSkeleton />
      ) : trendingMovies.length > 0 ? (
        <HeroSlider
          items={trendingMovies}
          paused={isModalOpen}
          getImageUrl={(movie) => getImageUrl(movie.backdrop_path, 'w1280')}
        >
          {(movie) => (
            <HeroSection
              key={movie.id}
              movie={movie}
              onWatchTrailer={handleWatchTrailer}
            />
          )}
        </HeroSlider>
      ) : null}

      {/* Trending Now */}
      <section className='layout-px relative z-20 -mt-4 mb-8 md:-mt-15.5 md:mb-21'>
        <h2 className='text-display-xs lg:text-display-lg mb-6 font-bold md:mb-10'>
          Trending Now
        </h2>
        {trendingLoading ? (
          <div className='flex gap-3 overflow-hidden md:gap-4'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='w-[calc((100%-12px)/2)] shrink-0 md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)] xl:w-[calc((100%-64px)/5)]'
              >
                <MovieCardSkeleton variant='compact' />
              </div>
            ))}
          </div>
        ) : (
          <Carousel movies={trendingMovies.slice(0, 20)} />
        )}
      </section>

      {/* New Release */}
      <section className='layout-px'>
        <div className='relative'>
          <h2 className='text-display-xs lg:text-display-lg mb-6 font-bold md:mb-10'>
            New Release
          </h2>
          <div className='grid grid-cols-2 gap-4 space-y-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 md:space-y-5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {newReleaseMovies.map((movie) => (
              <MovieCard
                key={`new-${movie.id}`}
                movie={movie}
                size='large'
                onWatchTrailer={handleWatchTrailer}
                trailerAvailable={!trailerLoading}
                onImageLoad={handleImageLoad}
              />
            ))}
            {(newReleaseLoading || isFetchingNextPage) &&
              [...Array(10)].map((_, i) => (
                <MovieCardSkeleton key={`skeleton-${i}`} variant='compact' />
              ))}
          </div>
          {hasNextPage && (
            <div>
              <div
                className='flex-center absolute bottom-10 left-0 z-50 h-[150px] w-full bg-linear-to-t from-black via-black/80 to-transparent transition-all duration-300 hover:from-black/90 hover:via-black/90 active:from-black active:via-black/95 md:h-[400px]'
                onClick={() => {
                  if (allImagesLoaded) fetchNextPage();
                }}
              >
                <Button
                  variant='secondary'
                  className='translate-y-5 shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-90 md:translate-y-10'
                  disabled={isFetchingNextPage || !allImagesLoaded}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (allImagesLoaded) fetchNextPage();
                  }}
                >
                  {isFetchingNextPage
                    ? 'Loading...'
                    : !allImagesLoaded
                      ? 'Loading...'
                      : 'Load More'}
                </Button>
              </div>
              <div ref={ref} className='flex-center h-20 w-full p-4'>
                {(isFetchingNextPage || !allImagesLoaded) && (
                  <MovieCardSkeleton variant='compact' />
                )}
              </div>
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
