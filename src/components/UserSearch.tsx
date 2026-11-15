type UserSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <div className="search">
      <label htmlFor="user-search">Buscar usuario</label>
      <input
        id="user-search"
        type="search"
        value={value}
        placeholder="Por nombre…"
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
