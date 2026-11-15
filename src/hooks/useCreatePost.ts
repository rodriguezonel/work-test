import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, type NewPost, type Post } from '../api/jsonplaceholder'

type PostInput = Pick<NewPost, 'title' | 'body'>

export function useCreatePost(userId: number) {
  const queryClient = useQueryClient()
  const queryKey = ['posts', userId] as const

  return useMutation({
    mutationFn: (input: PostInput) => createPost({ ...input, userId }),

    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey })
      const previous = queryClient.getQueryData<Post[]>(queryKey)

      const optimistic: Post = {
        ...input,
        userId,
        // El servidor devuelve siempre id 101; generamos uno local estable.
        id: crypto.randomUUID(),
        local: true,
      }

      queryClient.setQueryData<Post[]>(queryKey, (old = []) => [
        optimistic,
        ...old,
      ])

      return { previous }
    },

    onError: (_error, _input, context) => {
      // Restauramos incluso cuando no había datos previos (previous === undefined).
      queryClient.setQueryData<Post[]>(queryKey, context?.previous ?? [])
    },

    // Sin invalidateQueries: borraría el post local porque la API no lo guarda.
  })
}
