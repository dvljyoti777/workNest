import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import InviteMemberModal from './InviteMemberModal'

describe('InviteMemberModal', () => {
  it('closes with Escape when no request is pending', async () => {
    const close = vi.fn()
    const user = userEvent.setup()
    render(<InviteMemberModal onClose={close} onInvite={vi.fn()} isSaving={false} />)
    await user.keyboard('{Escape}')
    expect(close).toHaveBeenCalledOnce()
  })

  it('submits accessible member fields', async () => {
    const invite = vi.fn().mockResolvedValue(undefined)
    const user = userEvent.setup()
    render(<InviteMemberModal onClose={vi.fn()} onInvite={invite} isSaving={false} />)
    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Jamie Doe')
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'jamie@example.com')
    await user.click(screen.getByRole('button', { name: 'Send invite' }))
    expect(invite).toHaveBeenCalledWith(expect.objectContaining({ name: 'Jamie Doe', email: 'jamie@example.com', role: 'member' }))
  })
})
