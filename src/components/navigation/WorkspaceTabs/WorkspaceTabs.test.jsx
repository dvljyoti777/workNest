import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import WorkspaceTabs from './WorkspaceTabs'

describe('WorkspaceTabs', () => {
  beforeEach(() => window.localStorage.removeItem('worknest_workspace_tabs'))

  it('opens a route once and returns to Dashboard when the active tab closes', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/dashboard']}><Link to="/team">Open team page</Link><WorkspaceTabs /><Routes><Route path="*" element={<div />} /></Routes></MemoryRouter>)
    await user.click(screen.getByRole('link', { name: 'Open team page' }))
    expect(screen.getAllByRole('button', { name: 'Team' })).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: 'Close Team tab' }))
    expect(screen.getByRole('button', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page')
  })
})
