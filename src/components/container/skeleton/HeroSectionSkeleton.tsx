import React from 'react';
import Skeleton from '../../ui/Skeleton';
import LoadingSpinner from '../../ui/LoadingSpinner';

export const HeroSectionSkeleton: React.FC = () => {
  return (
    <div className='relative mb-4 w-full'>
      <div className='relative h-160 w-full md:h-128 lg:h-200'>
        {/* Background Overlay */}
        <div className='absolute inset-0 bottom-0 z-10 bg-linear-to-t from-black via-black/70 to-transparent md:via-black/50' />

        {/* Loading Spinner */}
        <LoadingSpinner className='absolute inset-0 z-20 flex items-center justify-center' />

        {/* Placeholder image background */}
        <Skeleton className='h-full w-full rounded-none bg-neutral-900' />

        {/* Content Overlay */}
        <div className='layout-px absolute top-80 left-0 z-20 w-full max-w-6xl sm:top-70 md:top-85 lg:top-120'>
          <div className='flex h-full flex-col'>
            <div className='flex-1'>
              {/* Title Skeleton */}
              <Skeleton className='mb-4 h-8 w-3/4 bg-neutral-800 sm:h-10 md:h-12 md:w-1/2 lg:h-14' />

              {/* Description Skeleton (multi-line) */}
              <Skeleton className='mb-2 h-4 w-full bg-neutral-800 md:h-5 md:w-2/3' />
              <Skeleton className='mb-2 h-4 w-5/6 bg-neutral-800 md:h-5 md:w-3/5' />
              <Skeleton className='mb-8 h-4 w-2/3 bg-neutral-800 md:h-5 md:w-1/2' />
            </div>

            {/* Buttons Skeleton */}
            <div className='flex w-full shrink-0 flex-col gap-3 md:flex-row md:gap-4'>
              <Skeleton className='h-12 w-full rounded-full bg-neutral-800 md:w-[230px]' />
              <Skeleton className='h-12 w-full rounded-full bg-neutral-800 md:w-[230px]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
