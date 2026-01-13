import React from 'react';
import Skeleton from '../../ui/Skeleton';

interface MovieCardSkeletonProps {
  variant?: 'compact' | 'default';
}

const MovieCardSkeleton: React.FC<MovieCardSkeletonProps> = ({
  variant = 'compact',
}) => {
  if (variant === 'compact') {
    return (
      <div className='relative'>
        {/* Poster Skeleton */}
        <Skeleton className='aspect-2/3 mb-2 w-full rounded-lg' />
        {/* Title Skeleton */}
        <Skeleton className='h-5 w-3/4 mb-2' />
        {/* Rating Skeleton */}
        <Skeleton className='h-4 w-1/2' />
      </div>
    );
  }

  return (
    <div className='relative flex flex-col mb-0 lg:mb-16 mt-12 w-full border-b border-neutral-800 last:border-b-0 pb-12'>
      <div className='flex flex-row lg:items-start rounded-2xl'>
        {/* Poster */}
        <div className='shrink-0 mr-4 lg:mr-8'>
            <Skeleton className='w-32 h-44 lg:w-45 lg:h-67.5 rounded-sm lg:rounded-md' />
        </div>

        {/* Content */}
        <div className='flex-1 flex flex-col justify-between min-w-0'>
          <div className='flex-1 pr-0 lg:pr-45'>
             {/* Title */}
            <Skeleton className='h-8 w-1/2 mb-3' />
            
            {/* Rating */}
            <div className='flex items-center gap-2 mb-3'>
              <Skeleton className='w-6 h-6 rounded-full' />
              <Skeleton className='h-6 w-16' />
            </div>

            {/* Overview */}
            <Skeleton className='h-4 w-full mb-2' />
            <Skeleton className='h-4 w-full mb-2' />
            <Skeleton className='h-4 w-2/3 mb-4' />
          </div>
          
          <div className='hidden lg:flex items-center gap-4 mt-1'>
            <Skeleton className='h-11 lg:h-13 w-40 rounded-full' />
          </div>
        </div>
      </div>

       {/* Mobile Version Buttons */}
      <div className='lg:hidden mt-8 flex gap-3 items-center'>
         <Skeleton className='flex-1 h-11 rounded-full' />
         <Skeleton className='w-11 h-11 rounded-full' />
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
