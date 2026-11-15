import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { BASE_URL, server } from './server'
import { renderWithProviders } from './utils'

describe('formulario de publicación', () => {
  it('valida los campos y crea una publicación con el body correcto', async () => {
    const sentBodies: Array<Record<string, unknown>> = []

    server.use(
      http.post(`${BASE_URL}/posts`, async ({ request }) => {
        sentBodies.push((await request.json()) as Record<string, unknown>)
        return HttpResponse.json({ id: 101 }, { status: 201 })
      }),
    )

    const user = userEvent.setup()
    renderWithProviders(<App />)

    await user.click(
      await screen.findByRole('button', { name: /leanne graham/i }),
    )
    await screen.findByRole('button', { name: /publicar/i })

    await user.click(screen.getByRole('button', { name: /publicar/i }))

    expect(screen.getByText('El título es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('El texto es obligatorio')).toBeInTheDocument()
    expect(sentBodies).toHaveLength(0)

    await user.type(screen.getByLabelText(/título/i), 'Mi primer post')
    await user.type(screen.getByLabelText(/texto/i), 'Contenido de prueba')
    await user.click(screen.getByRole('button', { name: /publicar/i }))

    expect(await screen.findByText('Mi primer post')).toBeInTheDocument()
    expect(sentBodies).toHaveLength(1)
    expect(sentBodies[0]).toMatchObject({
      userId: 1,
      title: 'Mi primer post',
      body: 'Contenido de prueba',
    })
    expect(screen.getByText('Nuevo')).toBeInTheDocument()
  })

  it('revierte la publicación optimista si el POST falla', async () => {
    server.use(
      http.post(`${BASE_URL}/posts`, () =>
        HttpResponse.json({ message: 'boom' }, { status: 500 }),
      ),
    )

    const user = userEvent.setup()
    renderWithProviders(<App />)

    await user.click(
      await screen.findByRole('button', { name: /leanne graham/i }),
    )
    await screen.findByRole('button', { name: /publicar/i })

    await user.type(screen.getByLabelText(/título/i), 'Post que falla')
    await user.type(screen.getByLabelText(/texto/i), 'Contenido')
    await user.click(screen.getByRole('button', { name: /publicar/i }))

    expect(
      await screen.findByText('Error al publicar. Intentá de nuevo.'),
    ).toBeInTheDocument()
    expect(screen.queryByText('Post que falla')).not.toBeInTheDocument()
  })
})
