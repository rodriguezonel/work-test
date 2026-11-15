export type PostErrors = Partial<Record<'title' | 'body', string>>

export const TITLE_MAX = 120
export const BODY_MAX = 1000

export function validatePost(input: { title: string; body: string }): PostErrors {
  const errors: PostErrors = {}
  const title = input.title.trim()
  const body = input.body.trim()

  if (!title) errors.title = 'El título es obligatorio'
  else if (title.length > TITLE_MAX) errors.title = `Máximo ${TITLE_MAX} caracteres`

  if (!body) errors.body = 'El texto es obligatorio'
  else if (body.length > BODY_MAX) errors.body = `Máximo ${BODY_MAX} caracteres`

  return errors
}
