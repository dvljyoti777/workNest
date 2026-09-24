import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ResourceState from './ResourceState'

describe('ResourceState', () => {
  it('announces loading content', () => {
    render(<ResourceState type="loading" />)
    expect(screen.getByRole('status', { name: 'Loading content' })).toBeInTheDocument()
  })

  it('shows an error and lets the user retry', async () => {
    const retry = vi.fn()
    const user = userEvent.setup()
    render(<ResourceState type="error" title="Projects unavailable" message="Network failed" onRetry={retry} />)
    expect(screen.getByRole('alert')).toHaveTextContent('Network failed')
    await user.click(screen.getByRole('button', { name: 'Retry' }))
    expect(retry).toHaveBeenCalledOnce()
  })

  it('shows an empty state without creating an unavailable action', () => {
    render(<ResourceState type="empty" title="No projects" message="Create your first project." />)
    expect(screen.getByRole('status')).toHaveTextContent('No projects')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
