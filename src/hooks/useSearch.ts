import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/movies';

export const useSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['search', query],
    queryFn: ({ pageParam = 1 }) => searchMovies(query, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    enabled: !!query,
    initialPageParam: 1,
  });

  return {
    query,
    searchResults: data,
    loading: isLoading || isRefetching,
    error,
    hasMoreResults: hasNextPage,
    loadMoreResults: fetchNextPage,
    isFetchingNextPage,
  };
};
