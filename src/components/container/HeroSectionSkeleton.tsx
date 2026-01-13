import React from 'react';
import Skeleton from '../ui/Skeleton';

export const HeroSectionSkeleton: React.FC = () => {
  return (
    <div className='relative w-full mb-4'>
      <div className='relative w-full h-160 md:h-128 lg:h-200'>
        {/* Background Overlay */}
        <div className='absolute inset-0 bottom-0 bg-linear-to-t from-black via-black/70 md:via-black/50 to-transparent z-10' />
        
        {/* Placeholder image background */}
        <Skeleton className='w-full h-full rounded-none bg-neutral-900' />
        
        {/* Content Overlay */}
        <div className='absolute top-80 sm:top-70 md:top-85 lg:top-120 left-0 z-20 w-full px-4 sm:px-15 lg:px-25 xl:px-35 max-w-6xl'>
          <div className='flex flex-col h-full'>
            <div className='flex-1'>
              {/* Title Skeleton */}
              <Skeleton className='h-8 sm:h-10 md:h-12 lg:h-14 w-3/4 md:w-1/2 mb-4 bg-neutral-800' />
              
              {/* Description Skeleton (multi-line) */}
              <Skeleton className='h-4 md:h-5 w-full md:w-2/3 mb-2 bg-neutral-800' />
              <Skeleton className='h-4 md:h-5 w-5/6 md:w-3/5 mb-2 bg-neutral-800' />
              <Skeleton className='h-4 md:h-5 w-2/3 md:w-1/2 mb-8 bg-neutral-800' />
            </div>
            
             {/* Buttons Skeleton */}
            <div className='flex flex-col gap-3 w-full md:flex-row md:gap-4 shrink-0'>
              <Skeleton className='w-full md:w-[230px] h-12 rounded-full bg-neutral-800' />
              <Skeleton className='w-full md:w-[230px] h-12 rounded-full bg-neutral-800' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
