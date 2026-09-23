import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AuthContext } from '../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'

function LoginScreen() {
  const location = useLocation()
  return <p>Login required for {location.state?.from?.pathname}</p>
}

function renderRoute(isAuthenticated) {
  return render(<AuthContext.Provider value={{ isAuthenticated, user: isAuthenticated ? { role: 'member' } : null, can: vi.fn() }}><MemoryRouter initialEntries={['/private']}><Routes><Route element={<ProtectedRoute />}><Route path="/private" element={<h1>Private workspace</h1>} /></Route><Route path="/login" element={<LoginScreen />} /></Routes></MemoryRouter></AuthContext.Provider>)
}

describe('ProtectedRoute', () => {
  it('redirects a logged-out visitor to login and preserves the requested location', () => {
    renderRoute(false)
    expect(screen.getByText('Login required for /private')).toBeInTheDocument()
    expect(screen.queryByText('Private workspace')).not.toBeInTheDocument()
  })

  it('renders the protected screen for an authenticated user', () => {
    renderRoute(true)
    expect(screen.getByRole('heading', { name: 'Private workspace' })).toBeInTheDocument()
  })
})
