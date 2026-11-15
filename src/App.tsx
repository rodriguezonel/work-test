import { useState } from 'react'
import { PostForm } from './components/PostForm'
import { PostList } from './components/PostList'
import { QueryState } from './components/QueryState'
import { UserList } from './components/UserList'
import { UserSearch } from './components/UserSearch'
import { useUsers } from './hooks/useUsers'
import { initials } from './lib/initials'

function App() {
  const [search, setSearch] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const usersQuery = useUsers()

  const selectedUser =
    usersQuery.data?.find((user) => user.id === selectedUserId) ?? null

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Publicaciones</h1>
          <p className="app-subtitle">Demo con JSONPlaceholder</p>
        </div>
        <span className="badge">Datos de demo</span>
      </header>

      <div className="layout">
        <aside className="panel users-panel" aria-labelledby="users-title">
          <div className="section-heading">
            <h2 id="users-title">Usuarios</h2>
          </div>

          <UserSearch value={search} onChange={setSearch} />

          <QueryState
            isLoading={usersQuery.isLoading}
            error={usersQuery.error}
            onRetry={() => void usersQuery.refetch()}
            loadingLabel="Cargando usuarios…"
          >
            <UserList
              users={usersQuery.data ?? []}
              search={search}
              selectedUserId={selectedUserId}
              onSelect={setSelectedUserId}
            />
          </QueryState>
        </aside>

        <main className="panel detail-panel">
          {selectedUser ? (
            <>
              <div className="user-summary">
                <span className="avatar avatar--lg" aria-hidden="true">
                  {initials(selectedUser.name)}
                </span>
                <div>
                  <h2>{selectedUser.name}</h2>
                  <p className="user-card-meta">
                    {selectedUser.email} · {selectedUser.company.name}
                  </p>
                </div>
              </div>

              <PostForm key={selectedUser.id} userId={selectedUser.id} />
              <PostList userId={selectedUser.id} />
            </>
          ) : (
            <div className="placeholder">
              <span className="placeholder-icon" aria-hidden="true">
                💬
              </span>
              <h2>Elegí un usuario</h2>
              <p>Seleccioná un usuario de la lista para ver sus publicaciones.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
