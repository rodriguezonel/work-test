import { useId, useState, type FormEvent } from 'react'
import { useCreatePost } from '../hooks/useCreatePost'
import { BODY_MAX, TITLE_MAX, validatePost, type PostErrors } from '../lib/validatePost'

type PostFormProps = {
  userId: number
}

export function PostForm({ userId }: PostFormProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState<PostErrors>({})
  const titleId = useId()
  const bodyId = useId()
  const mutation = useCreatePost(userId)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validatePost({ title, body })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    mutation.mutate(
      { title: title.trim(), body: body.trim() },
      {
        onSuccess: () => {
          setTitle('')
          setBody('')
          setErrors({})
        },
      },
    )
  }

  return (
    <section className="post-form" aria-labelledby="post-form-title">
      <h3 id="post-form-title">Nueva publicación</h3>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor={titleId}>Título</label>
          <input
            id={titleId}
            type="text"
            value={title}
            maxLength={TITLE_MAX}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? `${titleId}-error` : undefined}
            onChange={(event) => setTitle(event.target.value)}
          />
          {errors.title && (
            <span id={`${titleId}-error`} className="field-error" role="alert">
              {errors.title}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor={bodyId}>Texto</label>
          <textarea
            id={bodyId}
            value={body}
            rows={4}
            maxLength={BODY_MAX}
            aria-invalid={Boolean(errors.body)}
            aria-describedby={errors.body ? `${bodyId}-error` : undefined}
            onChange={(event) => setBody(event.target.value)}
          />
          <span className="field-hint">
            {body.length}/{BODY_MAX}
          </span>
          {errors.body && (
            <span id={`${bodyId}-error`} className="field-error" role="alert">
              {errors.body}
            </span>
          )}
        </div>

        {mutation.isError && (
          <p className="form-error" role="alert">
            Error al publicar. Intentá de nuevo.
          </p>
        )}

        <button type="submit" className="button" disabled={mutation.isPending}>
          {mutation.isPending ? 'Enviando…' : 'Publicar'}
        </button>
      </form>
    </section>
  )
}
