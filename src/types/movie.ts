export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  video: boolean;
  adult: boolean;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type MovieCardVariant = 'compact' | 'large';
export type MovieCardSize = 'small' | 'medium' | 'large';

export interface MovieCardProps {
  movie: Movie;
  variant?: MovieCardVariant;
  size?: MovieCardSize;
  trendingRank?: number;
  onWatchTrailer?: (id: number, key?: string) => void;
  trailerAvailable?: boolean;
  onImageLoad?: (id: number) => void;
  children?: React.ReactNode;
}
