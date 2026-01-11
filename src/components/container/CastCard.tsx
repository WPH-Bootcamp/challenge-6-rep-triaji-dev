import React from 'react';
import { getImageUrl } from '../../api/movies';

interface CastCardProps {
  name: string;
  role: string;
  profilePath: string | null | undefined;
}

export const CastCard: React.FC<CastCardProps> = ({ name, role, profilePath }) => {
  return (
    <div className='flex items-center gap-4 bg-white/5 p-3 rounded-xl transition-colors hover:bg-white/10'>
      <div className='w-16 h-16 shrink-0 rounded-full overflow-hidden bg-white/10'>
        {profilePath ? (
          <img
            src={getImageUrl(profilePath, 'w185')}
            alt={name}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-white/30'>
            <span className='text-xs'>No Img</span>
          </div>
        )}
      </div>
      <div>
        <h4 className='text-white font-medium line-clamp-1'>{name}</h4>
        <p className='text-white/60 text-sm line-clamp-1'>{role}</p>
      </div>
    </div>
  );
};


