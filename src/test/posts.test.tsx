import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { delay, http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { postsFixture } from './fixtures'
import { BASE_URL, server } from './server'
import { renderWithProviders } from './utils'

describe('publicaciones por usuario', () => {
  it('muestra el estado de carga y luego las publicaciones', async () => {
    server.use(
      http.get(`${BASE_URL}/posts`, async ({ request }) => {
        await delay(80)
        const userId = Number(new URL(request.url).searchParams.get('userId'))
        return HttpResponse.json(
          postsFixture.filter((post) => post.userId === userId),
        )
      }),
    )

    const user = userEvent.setup()
    renderWithProviders(<App />)

    await user.click(
      await screen.findByRole('button', { name: /leanne graham/i }),
    )

    expect(screen.getByText('Cargando publicaciones…')).toBeInTheDocument()
    expect(
      await screen.findByText(postsFixture[0].title),
    ).toBeInTheDocument()
    expect(screen.getByText(postsFixture[1].title)).toBeInTheDocument()
  })

  it('muestra el estado vacío cuando el usuario no tiene publicaciones', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    await user.click(
      await screen.findByRole('button', { name: /clementine bauch/i }),
    )

    expect(
      await screen.findByText('Este usuario no tiene publicaciones.'),
    ).toBeInTheDocument()
  })
})
