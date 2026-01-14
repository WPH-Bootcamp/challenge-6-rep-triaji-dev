import React from 'react';
import type { MovieCardProps } from '../../types/movie';
import MovieCardCompact from './MovieCardCompact';
import MovieCardLarge from './MovieCardLarge';

const MovieCard: React.FC<MovieCardProps> = ({ variant = 'compact', ...props }): React.ReactElement => {
  if (variant === 'compact') {
    return <MovieCardCompact variant={variant} {...props} />;
  }
  return <MovieCardLarge variant={variant} {...props} />;
};

export default React.memo(MovieCard);