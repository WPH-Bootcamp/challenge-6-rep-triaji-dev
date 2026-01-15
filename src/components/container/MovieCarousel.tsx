import React from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '../../types/movie';
import {
  Carousel as MovieCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../ui/Carousel';

interface CarouselProps {
  movies: Movie[];
}

export const Carousel: React.FC<CarouselProps> = ({ movies }) => {
  const total = Math.min(movies.length, 20);
  const items = movies.slice(0, total);
  
  const [api, setApi] = React.useState<CarouselApi>(); 
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    };
    
    onSelect();
    api.on('reInit', onSelect);
    api.on('select', onSelect);
    
    return () => {
        api.off('reInit', onSelect);
        api.off('select', onSelect);
    };
  }, [api]);

  return (
    <MovieCarousel
      setApi={setApi}
      opts={{
        align: 'start',
        loop: false,
      }}
      className="w-full relative group/carousel"
    >
      <CarouselContent className="-ml-4 md:-ml-5" viewportClassName="overflow-visible">
        {items.map((movie, idx) => (
          <CarouselItem key={movie.id} className="pl-4 md:pl-5 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6">
            <MovieCard movie={movie} size='large' trendingRank={idx + 1} />
          </CarouselItem>
        ))}
      </CarouselContent>
      
      {/* Hover Bridges (Invisible) */}
      <div className="absolute top-0 bottom-0 -left-24 w-24 z-0 bg-transparent" />
      <div className="absolute top-0 bottom-0 -right-24 w-24 z-0 bg-transparent" />

      {/* Gradients */}
      <div 
        className={`absolute top-0 bottom-0 -left-10 md:-left-36 w-20 md:w-48 bg-linear-to-r from-transparent to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollPrev ? 'from-black' : ''} ${canScrollPrev ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: canScrollPrev ? 'linear-gradient(to right, #000, transparent)' : undefined }}
      />
      <div 
        className={`absolute top-0 bottom-0 -right-10 md:-right-36 w-20 md:w-48 bg-linear-to-l from-transparent to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollNext ? 'from-black' : ''} ${canScrollNext ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: canScrollNext ? 'linear-gradient(to left, #000, transparent)' : undefined }}
      />

      {canScrollPrev && <CarouselPrevious variant="icon" className="left-2 md:-left-20 top-[40%] bg-neutral-800/80 hover:bg-neutral-700/80 text-white border-none h-10 w-10 md:h-12 md:w-12 rounded-full flex-center p-0 md:opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20" />}
      {canScrollNext && <CarouselNext variant="icon" className="right-2 md:-right-20 top-[40%] bg-neutral-800/80 hover:bg-neutral-700/80 text-white border-none h-10 w-10 md:h-12 md:w-12 rounded-full flex-center p-0 md:opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20" />}
    </MovieCarousel>
  );
};

export default Carousel;
