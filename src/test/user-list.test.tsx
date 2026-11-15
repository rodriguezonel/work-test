import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { renderWithProviders } from './utils'

describe('lista de usuarios', () => {
  it('muestra los 10 usuarios y filtra por nombre sin distinguir mayúsculas', async () => {
    const user = userEvent.setup()
    renderWithProviders(<App />)

    const list = await screen.findByRole('list', { name: /usuarios/i })
    expect(within(list).getAllByRole('listitem')).toHaveLength(10)

    await user.type(
      screen.getByRole('searchbox', { name: /buscar usuario/i }),
      'LEANNE',
    )

    expect(within(list).getAllByRole('listitem')).toHaveLength(1)
    expect(
      within(list).getByRole('button', { name: /leanne graham/i }),
    ).toBeInTheDocument()
    expect(screen.getByText('1 resultado')).toBeInTheDocument()
  })
})
