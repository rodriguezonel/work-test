import type { User } from '../api/jsonplaceholder'
import { initials } from '../lib/initials'

type UserListProps = {
  users: User[]
  search: string
  selectedUserId: number | null
  onSelect: (userId: number) => void
}

export function UserList({
  users,
  search,
  selectedUserId,
  onSelect,
}: UserListProps) {
  const term = search.trim().toLowerCase()
  const filtered = term
    ? users.filter((user) => user.name.toLowerCase().includes(term))
    : users

  const countLabel = `${filtered.length} ${
    filtered.length === 1 ? 'resultado' : 'resultados'
  }`

  if (filtered.length === 0) {
    return (
      <p className="empty" role="status">
        No hay usuarios que coincidan con «{search.trim()}».
      </p>
    )
  }

  return (
    <>
      <p className="result-count" aria-live="polite">
        {countLabel}
      </p>
      <ul className="user-list" aria-label="Usuarios">
        {filtered.map((user) => {
          const isSelected = user.id === selectedUserId
          return (
            <li key={user.id}>
              <button
                type="button"
                className={`user-card${isSelected ? ' user-card--selected' : ''}`}
                aria-pressed={isSelected}
                onClick={() => onSelect(user.id)}
              >
                <span className="avatar" aria-hidden="true">
                  {initials(user.name)}
                </span>
                <span className="user-card-body">
                  <span className="user-card-name">{user.name}</span>
                  <span className="user-card-meta">{user.email}</span>
                  <span className="user-card-meta">{user.company.name}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
