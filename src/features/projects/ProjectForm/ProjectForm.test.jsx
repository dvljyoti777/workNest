import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ProjectForm from './ProjectForm'

describe('ProjectForm', () => {
  it('shows useful validation messages and does not submit invalid values', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ProjectForm onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: /create project/i }))
    expect(screen.getByText('Project name is required.')).toBeInTheDocument()
    expect(screen.getByText('Description must be at least 10 characters.')).toBeInTheDocument()
    expect(screen.getByText('Due date is required.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits the values after the user completes a valid form', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    render(<ProjectForm onSubmit={onSubmit} />)
    await user.type(screen.getByRole('textbox', { name: /project name/i }), 'Client portal')
    await user.type(screen.getByRole('textbox', { name: /description/i }), 'Build the client portal experience')
    await user.type(screen.getByLabelText(/due date/i), '2026-10-20')
    await user.click(screen.getByRole('button', { name: /create project/i }))
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Client portal', description: 'Build the client portal experience', dueDate: '2026-10-20' })
  })
})
