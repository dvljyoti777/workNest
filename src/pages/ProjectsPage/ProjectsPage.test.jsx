import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthContext } from '../../context/AuthContext'
import { projectService } from '../../services/projectService'
import ProjectsPage from './ProjectsPage'

vi.mock('../../services/projectService', () => ({
  projectService: {
    getProjects: vi.fn(),
  },
}))

const projects = [
  { id: 'project-1', name: 'Website Redesign', color: '#635bff', tasks: { completed: 2, total: 4 } },
  { id: 'project-2', name: 'Mobile App Launch', color: '#12b76a', tasks: { completed: 3, total: 6 } },
]

function renderProjects() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  const auth = {
    user: { id: 'user-1', name: 'Test Manager', role: 'manager' },
    isAuthenticated: true,
    can: () => true,
    login: vi.fn(),
    logout: vi.fn(),
  }

  return render(
    <QueryClientProvider client={client}>
      <AuthContext.Provider value={auth}>
        <MemoryRouter><ProjectsPage /></MemoryRouter>
      </AuthContext.Provider>
    </QueryClientProvider>,
  )
}

describe('project filtering', () => {
  beforeEach(() => projectService.getProjects.mockResolvedValue(projects))

  it('shows projects returned by the service and filters them by name', async () => {
    const user = userEvent.setup()
    renderProjects()
    expect(await screen.findByRole('heading', { name: 'Website Redesign' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Mobile App Launch' })).toBeInTheDocument()
    await user.type(screen.getByRole('searchbox', { name: /search projects/i }), 'mobile')
    expect(screen.queryByRole('heading', { name: 'Website Redesign' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Mobile App Launch' })).toBeInTheDocument()
  })

  it('explains when no project matches the search', async () => {
    const user = userEvent.setup()
    renderProjects()
    await screen.findByRole('heading', { name: 'Website Redesign' })
    await user.type(screen.getByRole('searchbox', { name: /search projects/i }), 'finance')
    expect(screen.getByText(/no projects match/i)).toBeInTheDocument()
  })

  it('opens the create project dialog for a permitted user', async () => {
    const user = userEvent.setup()
    renderProjects()
    await screen.findByRole('heading', { name: 'Website Redesign' })

    await user.click(screen.getByRole('button', { name: /new project/i }))

    expect(screen.getByRole('dialog', { name: /create project/i })).toBeInTheDocument()
  })
})
