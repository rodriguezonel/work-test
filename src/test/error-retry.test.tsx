import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { BASE_URL, server } from './server'
import { renderWithProviders } from './utils'

describe('estados de error', () => {
  it('muestra el error de usuarios y permite reintentar', async () => {
    server.use(
      http.get(`${BASE_URL}/users`, () =>
        HttpResponse.json({ message: 'boom' }, { status: 500 }),
      ),
    )

    const user = userEvent.setup()
    renderWithProviders(<App />)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/error/i)

    server.resetHandlers()
    await user.click(within(alert).getByRole('button', { name: /reintentar/i }))

    expect(await screen.findByText(/leanne graham/i)).toBeInTheDocument()
  })
})
