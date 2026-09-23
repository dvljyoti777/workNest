import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AuthContext } from '../../context/AuthContext'
import LoginPage from './LoginPage'

describe('login flow', () => {
  it('logs in with the selected role and returns to the requested page', async () => {
    const user = userEvent.setup()
    const login = vi.fn().mockResolvedValue({ user: { role: 'admin' } })

    render(
      <AuthContext.Provider value={{ isAuthenticated: false, user: null, login, logout: vi.fn(), can: vi.fn() }}>
        <MemoryRouter initialEntries={[{ pathname: '/login', state: { from: { pathname: '/projects' } } }]}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<h1>Projects workspace</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>,
    )

    await user.click(screen.getByRole('radio', { name: /admin.*full access/i }))
    await user.click(screen.getByRole('button', { name: 'Sign in' }))

    expect(login).toHaveBeenCalledWith(expect.objectContaining({ role: 'admin', email: 'admin@worknest.demo' }))
    expect(await screen.findByRole('heading', { name: 'Projects workspace' })).toBeInTheDocument()
  })
})
