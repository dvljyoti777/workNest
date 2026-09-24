import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { AuthContext } from '../../context/AuthContext'
import { projectService } from '../../services/projectService'
import ProjectOverviewPage from '../../pages/ProjectOverviewPage/ProjectOverviewPage'
import ProjectLayout from './ProjectLayout'

vi.mock('../../services/projectService', () => ({ projectService: { getProjects: vi.fn() } }))

describe('ProjectLayout', () => {
  it('loads the selected project and derives its overview', async () => {
    projectService.getProjects.mockResolvedValue([{ id: 'project-2', name: 'Mobile App Launch', description: 'Prepare the app.', status: 'active', dueDate: '2026-10-12', tasks: { completed: 12, total: 20 }, members: [] }])
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(<QueryClientProvider client={client}><AuthContext.Provider value={{ can: () => true }}><MemoryRouter initialEntries={['/projects/project-2/overview']}><Routes><Route path="/projects/:projectId" element={<ProjectLayout />}><Route path="overview" element={<ProjectOverviewPage />} /></Route></Routes></MemoryRouter></AuthContext.Provider></QueryClientProvider>)

    expect(await screen.findByRole('heading', { name: 'Mobile App Launch' })).toBeInTheDocument()
    expect(screen.getByText('60%')).toBeInTheDocument()
    expect(screen.getByText('12 of 20 tasks')).toBeInTheDocument()
  })
})
