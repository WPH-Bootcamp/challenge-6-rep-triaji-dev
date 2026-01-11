import React, { useState, useEffect } from 'react';
import MovieCard from '../MovieCard';

import type { Movie } from '../../../interfaces/movie.interface';
import NavigationButton from '../../ui/NavigationButton';

interface CarouselProps {
  movies: Movie[];
}

const getVisibleCount = () => {
  if (typeof window === 'undefined') return 5;
  const width = window.innerWidth;
  if (width < 768) return 2;
  if (width < 1024) return 3;
  if (width < 1280) return 4;
  return 5;
};

export const Carousel: React.FC<CarouselProps> = ({ movies }) => {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [startIdx, setStartIdx] = useState(0);
  const total = Math.min(movies.length, 20);
  const items = movies.slice(0, total);

  const gapBase = 12;
  const gapMd = 16;
  const [gap, setGap] = useState(gapBase);
  useEffect(() => {
    function updateGap() {
      const width = window.innerWidth;
      if (width >= 768) setGap(gapMd);
      else setGap(gapBase);
    }
    updateGap();
    window.addEventListener('resize', updateGap);
    return () => window.removeEventListener('resize', updateGap);
  }, []);
  const totalGap = gap * (visibleCount - 1);
  const cardWidth = `calc((100% - ${totalGap}px) / ${visibleCount})`;

  const maxStartIdx = total <= visibleCount ? 0 : total - visibleCount;
  const safeStartIdx = Math.min(startIdx, maxStartIdx);

  const goPrev = () => {
    setStartIdx((prev) => (prev === 0 ? maxStartIdx : prev - 1));
  };
  const goNext = React.useCallback(() => {
    setStartIdx((prev) => (prev === maxStartIdx ? 0 : prev + 1));
  }, [maxStartIdx]);

  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [goNext]);

  useEffect(() => {
    function updateVisibleCount() {
      setVisibleCount(getVisibleCount());
    }
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const translateX = `-${safeStartIdx * (100 / visibleCount)}%`;

  return (
    <div className='relative w-full'>
      <div className='overflow-hidden w-full'>
        <div
          className={`flex gap-3 md:gap-4 transition-transform duration-500`}
          style={{
            transform: `translateX(${translateX})`,
          }}
        >
          {items.map((movie, idx) => (
            <div
              key={movie.id}
              className='flex-shrink-0'
              style={{ width: cardWidth }}
            >
              <MovieCard movie={movie} size='large' trendingRank={idx + 1} />
            </div>
          ))}
        </div>
      </div>
      <NavigationButton direction='prev' onClick={goPrev} disabled={false} />
      <NavigationButton direction='next' onClick={goNext} disabled={false} />
    </div>
  );
};

export default Carousel;
