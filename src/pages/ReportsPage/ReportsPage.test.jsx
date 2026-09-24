import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { projectService } from '../../services/projectService'
import { taskService } from '../../services/taskService'
import ReportsPage from './ReportsPage'

vi.mock('../../services/projectService', () => ({ projectService: { getProjects: vi.fn() } }))
vi.mock('../../services/taskService', () => ({ taskService: { getTasks: vi.fn() } }))

describe('report filters', () => {
  it('derives the task chart from the selected status', async () => {
    projectService.getProjects.mockResolvedValue([{ id: 'project-1', name: 'Website', status: 'active', tasks: { completed: 2, total: 4 } }])
    taskService.getTasks.mockResolvedValue([
      { id: 'task-1', projectId: 'project-1', title: 'Build', status: 'todo', priority: 'high', assignee: 'Alex', dueDate: '2026-09-20' },
      { id: 'task-2', projectId: 'project-1', title: 'Ship', status: 'done', priority: 'medium', assignee: 'Alex', dueDate: '2026-09-22' },
    ])
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const user = userEvent.setup()
    render(<QueryClientProvider client={client}><ReportsPage /></QueryClientProvider>)

    expect(await screen.findByRole('img', { name: 'Tasks by status: 2' })).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText('Status'), 'done')
    expect(screen.getByRole('img', { name: 'Tasks by status: 1' })).toBeInTheDocument()
  })
})
