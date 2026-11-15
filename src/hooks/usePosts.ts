import { useQuery } from '@tanstack/react-query'
import { fetchPosts } from '../api/jsonplaceholder'

export function usePosts(userId: number) {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchPosts(userId),
    // La API no persiste los posts creados: evitamos refetch que los borraría.
    staleTime: Infinity,
  })
}
