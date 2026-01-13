import React from 'react';
import { getImageUrl } from '../../api/movies';
import { User } from 'lucide-react';
import Skeleton from '../ui/Skeleton';

interface CastCardProps {
  name: string;
  role: string;
  profilePath: string | null | undefined;
}

export const CastCard: React.FC<CastCardProps> = ({ name, role, profilePath }) => {
 const [isImageLoaded, setIsImageLoaded] = React.useState(false);

 return (
     <div className='flex rounded-lg overflow-hidden w-full md:w-[360px] h-auto md:h-[104px] bg-neutral-900/10'>
       {profilePath ? (
         <div className="relative w-[50px] h-[75px] md:w-[69px] md:h-[104px] shrink-0">
            {!isImageLoaded && <Skeleton className='absolute inset-0 w-full h-full rounded-lg z-10' />}
            <img
            src={getImageUrl(profilePath)}
            alt={name}
            className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${!isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsImageLoaded(true)}
            />
         </div>
       ) : (
         <div className='w-[50px] h-[75px] md:w-[69px] md:h-[104px] bg-neutral-900/20 rounded-lg shrink-0 flex items-center justify-center'>
            <User className='w-6 h-6 md:w-12 md:h-12 text-neutral-500' />
         </div>
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


