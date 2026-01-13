import React from 'react';
import { getImageUrl } from '../../api/movies';

interface CastCardProps {
  name: string;
  role: string;
  profilePath: string | null | undefined;
}

export const CastCard: React.FC<CastCardProps> = ({ name, role, profilePath }) => {
 return (
     <div className='flex rounded-lg overflow-hidden w-full md:w-[360px] h-auto md:h-[104px]'>
       {profilePath ? (
         <img
           src={getImageUrl(profilePath)}
           alt={name}
           className='w-[50px] h-[75px] md:w-[69px] md:h-[104px] object-cover rounded-lg shrink-0'
         />
       ) : (
         <img
           src='/icons/icon-photo-blank.svg'
           alt='No photo available'
           className='w-[50px] h-[75px] md:w-[69px] md:h-[104px] object-cover rounded-lg shrink-0'
         />
       )}
       <div className='flex flex-col justify-center px-3 py-1 md:p-4'>
         <div className='font-semibold text-xs md:text-sm lg:text-md text-white'>
           {name}
         </div>
         <div className='text-xs md:text-sm lg:text-md text-neutral-400 mt-1'>{role}</div>
       </div>
     </div>
   );
};


