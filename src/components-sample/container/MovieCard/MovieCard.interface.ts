import type { Movie } from '../../../interfaces/movie.interface';

export type MovieCardVariant = 'compact' | 'large';
export type MovieCardSize = 'small' | 'medium' | 'large';

export interface MovieCardProps {
  movie: Movie;
  variant?: MovieCardVariant;
  size?: MovieCardSize;
  trendingRank?: number;
  onWatchTrailer?: () => void;
  trailerAvailable?: boolean;
  onRemoveFromFavorites?: () => void;
  children?: React.ReactNode;
}
