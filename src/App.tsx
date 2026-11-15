import { useState } from 'react'
import { PostForm } from './components/PostForm'
import { PostList } from './components/PostList'
import { QueryState } from './components/QueryState'
import { UserList } from './components/UserList'
import { UserSearch } from './components/UserSearch'
import { useUsers } from './hooks/useUsers'
import {
  DEMO_ACTIVE,
  getDemoOptions,
  setDemoOptions,
  type DemoOptions,
} from './lib/demo'
import { initials } from './lib/initials'

function App() {
  const [search, setSearch] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [demo, setDemo] = useState<DemoOptions>(getDemoOptions)
  const usersQuery = useUsers()
  const { slow, forceError } = demo

  const updateDemo = (next: Partial<DemoOptions>) => {
    // Solo cambia el flag: las peticiones fallan o se demoran cuando las dispara el usuario.
    setDemo(setDemoOptions(next))
  }

  const selectedUser =
    usersQuery.data?.find((user) => user.id === selectedUserId) ?? null

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Publicaciones</h1>
          <p className="app-subtitle">Demo con JSONPlaceholder</p>
        </div>

        <div className="app-header-side">
          {DEMO_ACTIVE && (
            <fieldset className="demo-controls">
              <legend className="visually-hidden">Modo demo</legend>

              <label>
                <input
                  type="checkbox"
                  checked={slow}
                  onChange={(event) => {
                    updateDemo({ slow: event.target.checked })
                  }}
                />
                Demora (1,2 s)
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={forceError}
                  onChange={(event) => {
                    updateDemo({ forceError: event.target.checked })
                  }}
                />
                Forzar error 500
              </label>
            </fieldset>
          )}

          <span className="badge">Datos de demo</span>
        </div>
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
