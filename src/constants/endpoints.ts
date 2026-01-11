export const TMDB_ENDPOINTS = {
  MOVIES: {
    TRENDING: '/trending/movie/week',
    NOW_PLAYING: '/movie/now_playing',
    SEARCH: '/search/movie',
    VIDEOS: (movieId: number) => `/movie/${movieId}/videos`,
    DETAILS: (movieId: number) => `/movie/${movieId}`,
    CREDITS: (movieId: number) => `/movie/${movieId}/credits`,
    GENRES: '/genre/movie/list',
  },
  IMAGES: {
    BASE_URL: 'https://image.tmdb.org/t/p/',
    POSTER_SIZE: 'w780',
  },
};
