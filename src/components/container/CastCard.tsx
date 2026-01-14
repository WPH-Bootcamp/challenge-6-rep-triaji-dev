import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../api/movies';
import { User } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';

interface CastCardProps {
  id?: number;
  name: string;
  role: string;
  profilePath: string | null | undefined;
}

export const CastCard: React.FC<CastCardProps> = ({ id, name, role, profilePath }) => {
 const [isImageLoaded, setIsImageLoaded] = React.useState(false);
 
 const Content = (
    <div className='group flex rounded-lg overflow-hidden w-full md:w-[360px] h-auto md:h-[104px] bg-neutral-900/0 transition-all duration-300 hover:bg-neutral-800/20 hover:scale-105 hover:shadow-xl cursor-pointer'>
      {profilePath ? (
        <div className="relative w-[50px] h-[75px] md:w-[69px] md:h-[104px] shrink-0">
           {!isImageLoaded && <LoadingSpinner className='absolute inset-0 w-full h-full rounded-lg z-10 bg-neutral-900' size="small" />}
           <img
           src={getImageUrl(profilePath)}
           alt={name}
           className={`w-full h-full object-cover rounded-lg transition-all duration-300 ${!isImageLoaded ? 'opacity-0' : 'opacity-100'}`}
           onLoad={() => setIsImageLoaded(true)}
           />
        </div>
      ) : (
         <div className='w-[50px] h-[75px] md:w-[69px] md:h-[104px] bg-neutral-900/20 rounded-lg shrink-0 flex-center overflow-hidden'>
            <User className='w-6 h-6 md:w-12 md:h-12 text-neutral-500 transition-transform duration-300 group-hover:scale-110' />
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

  if (id) {
    return (
      <Link to={`/search?person_id=${id}&person_name=${encodeURIComponent(name)}`} className="block">
        {Content}
      </Link>
    );
  }

  return Content;
};


