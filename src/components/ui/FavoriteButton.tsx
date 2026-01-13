import React from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'circle' | 'card';
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  className = '',
  size = 'medium',
  variant = 'circle',
}) => {
  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-11 h-11',
    large: 'w-14 h-14',
  };

  const iconSizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  const variantClasses = {
    circle: `flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/60 shadow-lg ${sizeClasses[size]}`,
    card: `flex items-center justify-center rounded-full bg-neutral-300/50 shadow-lg w-8 h-8`,
  };

  return (
    <button
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={`${variantClasses[variant]} transition-colors duration-200 ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <img
        src={isFavorite ? '/icons/icon-fav-on.svg' : '/icons/icon-fav-off.svg'}
        alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className={`cursor-pointer ${iconSizeClasses[size]}`}
      />
    </button>
  );
};

export default FavoriteButton;
