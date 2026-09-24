import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AuthContext } from '../../../context/AuthContext'
import Sidebar from './Sidebar'

describe('Sidebar collapse control', () => {
  it('keeps navigation accessible while collapsed and requests expansion', async () => {
    const user = userEvent.setup()
    const toggle = vi.fn()
    render(<AuthContext.Provider value={{ user: { name: 'Aarav Sharma', role: 'manager' }, can: () => true, logout: vi.fn() }}><MemoryRouter><Sidebar isOpen={false} isCollapsed onToggleCollapse={toggle} onClose={vi.fn()} /></MemoryRouter></AuthContext.Provider>)

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Expand sidebar' }))
    expect(toggle).toHaveBeenCalledOnce()
  })
})
