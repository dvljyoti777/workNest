import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ToastContext } from '../../ui/Toast/ToastContext'
import { AuthContext } from '../../../context/AuthContext'
import UserProfileMenu from './UserProfileMenu'

function renderProfile(changePassword = vi.fn().mockResolvedValue({ success: true })) {
  const showToast = vi.fn()
  render(<AuthContext.Provider value={{ user: { id: 'user-1', name: 'Aarav Sharma', email: 'aarav@example.com', role: 'manager' }, changePassword }}><ToastContext.Provider value={{ showToast }}><UserProfileMenu onClose={vi.fn()} /></ToastContext.Provider></AuthContext.Provider>)
  return { changePassword, showToast }
}

describe('UserProfileMenu', () => {
  it('shows account details and changes a valid password', async () => {
    const user = userEvent.setup()
    const { changePassword, showToast } = renderProfile()
    expect(screen.getByText('aarav@example.com')).toBeInTheDocument()
    expect(screen.getByText('manager')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Change password' }))
    await user.type(screen.getByLabelText('Current password'), 'worknest')
    await user.type(screen.getByLabelText('New password'), 'new-password')
    await user.type(screen.getByLabelText('Confirm new password'), 'new-password')
    await user.click(screen.getByRole('button', { name: 'Update password' }))

    expect(changePassword).toHaveBeenCalledWith({ currentPassword: 'worknest', newPassword: 'new-password', confirmPassword: 'new-password' })
    expect(showToast).toHaveBeenCalledWith('Password changed successfully')
  })

  it('rejects mismatched passwords before calling the service', async () => {
    const user = userEvent.setup()
    const { changePassword } = renderProfile()
    await user.click(screen.getByRole('button', { name: 'Change password' }))
    await user.type(screen.getByLabelText('Current password'), 'worknest')
    await user.type(screen.getByLabelText('New password'), 'new-password')
    await user.type(screen.getByLabelText('Confirm new password'), 'different-password')
    await user.click(screen.getByRole('button', { name: 'Update password' }))
    expect(screen.getByRole('alert')).toHaveTextContent(/do not match/i)
    expect(changePassword).not.toHaveBeenCalled()
  })
})
