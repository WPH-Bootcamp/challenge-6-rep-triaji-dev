import React from 'react';
import Skeleton from '../../ui/Skeleton';
import { useScreenSize } from '../../../hooks/useScreenSize';

export const DetailPageSkeleton: React.FC = () => {
    const { isMobile } = useScreenSize();

  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>
      {/* Background Image Skeleton */}
      <div className='relative w-full h-100 md:h-160 lg:h-200'>
         <Skeleton className='w-full h-full rounded-none bg-neutral-950' />
         <div className='absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent' />
      </div>

      {/* Main Content */}
      <div className=' -mt-40 z-10 relative layout-px pb-12 -translate-y-4 md:-translate-y-32 lg:-translate-y-64'>
        <div className='max-w-9xl mx-auto'>
          <div className='grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] md:grid-cols-[280px_1fr] space-x-6 md:space-x-8'>
            {/* Poster Skeleton */}
            <div className='row-span-2 md:col-span-1 mb-3'>
              <div className='rounded-md md:rounded-xl overflow-hidden flex items-center shadow-2xl shrink-0 aspect-2/3 md:w-[260px] md:h-[384px] w-[116px] h-[174px]'>
                 <Skeleton className='w-full h-full' />
              </div>
            </div>

            {/* Content Section */}
            <div className='md:col-span-2'>
              {/* Title Skeleton */}
              <div className='mb-4'>
                 <Skeleton className='h-8 sm:h-10 md:h-12 lg:h-14 w-3/4 mb-4 bg-neutral-800' />
                <div className='flex items-center gap-2 text-sm md:text-md font-medium mt-4'>
                   <Skeleton className='w-6 h-6 rounded-full' />
                   <Skeleton className='h-5 w-32' />
                </div>
              </div>
            </div>

            <div className='col-span-2 md:col-span-2 md:col-start-2 mt-4'>
              {/* Buttons Skeleton */}
              <div className='mb-6'>
                <div className='flex-between sm:justify-start gap-4'>
                   <Skeleton className='rounded-full h-12 w-auto flex-1 md:flex-none md:w-64' />
                   <Skeleton className={`rounded-full ${isMobile ? 'h-10 w-10' : 'h-12 w-12'}`} />
                </div>
              </div>

              {/* Info Cards Skeleton */}
              <div className='grid grid-cols-3 gap-4 mb-8 max-w-4xl'>
                 <Skeleton className='h-20 rounded-xl bg-neutral-800' />
                 <Skeleton className='h-20 rounded-xl bg-neutral-800' />
                 <Skeleton className='h-20 rounded-xl bg-neutral-800' />
              </div>
            </div>
          </div>

          {/* Overview Section Skeleton */}
          <div className='md:mt-8'>
             <Skeleton className='h-8 w-40 mb-4 md:mt-12 bg-neutral-800' />
             <div className='space-y-2'>
                <Skeleton className='h-4 w-full bg-neutral-800' />
                <Skeleton className='h-4 w-full bg-neutral-800' />
                <Skeleton className='h-4 w-3/4 bg-neutral-800' />
             </div>
          </div>

          {/* Cast & Crew Skeleton */}
          <div className='mt-12'>
             <Skeleton className='h-8 w-48 mb-6 bg-neutral-800' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...Array(6)].map((_, i) => (
                 <div key={i} className='flex items-center gap-4 bg-neutral-900/50 p-2 rounded-lg'>
                     <Skeleton className='w-16 h-16 rounded-full shrink-0' />
                     <div className='flex-1'>
                        <Skeleton className='h-5 w-3/4 mb-2' />
                        <Skeleton className='h-4 w-1/2' />
                     </div>
                 </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
