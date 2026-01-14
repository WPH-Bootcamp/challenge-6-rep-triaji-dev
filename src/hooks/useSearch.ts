import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { searchMovies, discoverMovies } from '../api/movies';

export const useSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const personId = searchParams.get('person_id');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['search', query, personId],
    queryFn: ({ pageParam = 1 }) => {
      if (personId) {
        return discoverMovies({ with_people: personId, page: pageParam });
      }
      return searchMovies(query, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    enabled: !!query || !!personId,
    initialPageParam: 1,
  });

  return {
    query,
    personId,
    searchResults: data,
    loading: isLoading || isRefetching,
    error,
    hasMoreResults: hasNextPage,
    loadMoreResults: fetchNextPage,
    isFetchingNextPage,
  };
};
