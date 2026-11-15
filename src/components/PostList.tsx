import { usePosts } from '../hooks/usePosts'
import { QueryState } from './QueryState'

type PostListProps = {
  userId: number
}

export function PostList({ userId }: PostListProps) {
  const { data, isLoading, error, refetch } = usePosts(userId)

  return (
    <section className="post-list" aria-labelledby="posts-title">
      <div className="section-heading">
        <h3 id="posts-title">Publicaciones</h3>
        {data && data.length > 0 && (
          <span className="count-badge">{data.length}</span>
        )}
      </div>

      <QueryState
        isLoading={isLoading}
        error={error}
        onRetry={() => void refetch()}
        loadingLabel="Cargando publicaciones…"
      >
        {data && data.length === 0 ? (
          <p className="empty">Este usuario no tiene publicaciones.</p>
        ) : (
          <ul className="posts">
            {data?.map((post) => (
              <li key={post.id} className="post-card">
                <div className="post-card-head">
                  <h4>{post.title}</h4>
                  {post.local && <span className="badge badge--new">Nuevo</span>}
                </div>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </QueryState>
    </section>
  )
}
