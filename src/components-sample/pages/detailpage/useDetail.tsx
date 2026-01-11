import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieTrailer,
  getGenres,
  type CastMember,
  type CrewMember,
  type Genre,
} from '../../../services/movies/services';
import type { Movie } from '../../../interfaces/movie.interface';

interface UseDetailResult {
  loading: boolean;
  error: string | null;
  movie: Movie | null;
  trailerKey: string | null;
  cast: CastMember[];
  crew: CrewMember[];
  genres: Genre[];
}

export const useDetail = (): UseDetailResult => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [movieData, creditsData, genresData] = await Promise.all([
          getMovieDetails(Number(id)),
          getMovieCredits(Number(id)),
          getGenres(),
        ]);
        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 5));
        setCrew(creditsData.crew.slice(0, 5));
        setGenres(genresData.genres);
        const trailer = await getMovieTrailer(Number(id));
        setTrailerKey(trailer);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch movie details');
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  return { loading, error, movie, trailerKey, cast, crew, genres };
};
