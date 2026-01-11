import React from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  className = '',
  size = 'medium',
}) => {
  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-12 h-12',
    large: 'w-14 h-14',
  };

  const iconSizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-7 h-7',
  };

  return (
    <button
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={`flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/60 shadow-lg transition-colors duration-200 ${sizeClasses[size]} ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <img
        src={isFavorite ? '/icon-fav-on.svg' : '/icon-fav-off.svg'}
        alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className={`cursor-pointer ${iconSizeClasses[size]}`}
      />
    </button>
  );
};

export default FavoriteButton;
