import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '../../lib/utils';

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
    large: 'w-13 h-13',
  };

  const iconSizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  const variantClasses = {
    circle: `flex-center rounded-full border border-neutral-800 bg-neutral-950/60 shadow-lg ${sizeClasses[size]}`,
    card: `flex-center rounded-full bg-neutral-900/50 shadow-lg w-8 h-8`,
  };

  return (
    <button
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(variantClasses[variant], "transition-colors duration-200", className)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Heart
        className={`cursor-pointer transition-all duration-200 hover:scale-120 active:scale-105 ${iconSizeClasses[size]} ${
          isFavorite ? 'fill-red-500 text-red-500' : 'fill-transparent text-white'
        }`}
      />
    </button>
  );
};

export default FavoriteButton;
