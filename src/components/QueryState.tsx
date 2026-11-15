import type { ReactNode } from 'react'

type QueryStateProps = {
  isLoading: boolean
  error: Error | null
  onRetry: () => void
  loadingLabel: string
  children: ReactNode
}

export function QueryState({
  isLoading,
  error,
  onRetry,
  loadingLabel,
  children,
}: QueryStateProps) {
  if (isLoading) {
    return (
      <div className="state state--loading" role="status">
        <span className="visually-hidden">{loadingLabel}</span>
        <div className="skeleton" aria-hidden="true" />
        <div className="skeleton skeleton--short" aria-hidden="true" />
        <div className="skeleton" aria-hidden="true" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="state state--error" role="alert">
        <p>
          <strong>Error:</strong> no se pudieron cargar los datos.
        </p>
        <p className="state-detail">{error.message}</p>
        <button type="button" className="button button--secondary" onClick={onRetry}>
          Reintentar
        </button>
      </div>
    )
  }

  return <>{children}</>
}
