import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { notificationService } from '../../../services/notificationService'
import NotificationMenu from './NotificationMenu'

vi.mock('../../../services/notificationService', () => ({ notificationService: { getNotifications: vi.fn(), markRead: vi.fn(), markAllRead: vi.fn() } }))

describe('NotificationMenu', () => {
  it('shows updates and marks every notification as read', async () => {
    notificationService.getNotifications.mockResolvedValue([{ id: 'notice-1', title: 'Task ready', message: 'Please review it.', type: 'task', createdAt: 'Now', read: false, href: '/tasks' }])
    notificationService.markAllRead.mockResolvedValue([])
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const user = userEvent.setup()
    render(<QueryClientProvider client={client}><MemoryRouter><NotificationMenu onClose={vi.fn()} /></MemoryRouter></QueryClientProvider>)

    expect(await screen.findByText('Task ready')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Mark all read' }))
    expect(notificationService.markAllRead).toHaveBeenCalledOnce()
  })
})
