import React from 'react';
import { getImageUrl } from '../../api/movies';

interface CastCardProps {
  name: string;
  role: string;
  profilePath: string | null | undefined;
}

export const CastCard: React.FC<CastCardProps> = ({ name, role, profilePath }) => {
 return (
     <div className='flex rounded-lg overflow-hidden w-full md:w-[360px] h-[104px]'>
       {profilePath ? (
         <img
           src={getImageUrl(profilePath)}
           alt={name}
           className='w-[69px] h-[104px] object-contain rounded-lg shrink-0'
         />
       ) : (
         <img
           src='/icons/icon-photo-blank.svg'
           alt='No photo available'
           className='w-[69px] h-[104px] object-contain rounded-lg shrink-0'
         />
       )}
       <div className='flex flex-col justify-center p-4'>
         <div className='font-semibold text-lg lg:text-xl text-white'>
           {name}
         </div>
         <div className='text-md lg:text-lg text-neutral-400 mt-1'>{role}</div>
       </div>
     </div>
   );
};


