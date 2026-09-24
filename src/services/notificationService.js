import { runtimeConfig } from '../config/runtimeConfig'
import { apiClient } from '../lib/apiClient'
import { notificationMocks } from '../mocks/notificationMocks'
import { clone, simulateRequest } from './serviceUtils'

let notifications = clone(notificationMocks)
const normalize = (payload) => payload?.data ?? payload

export const notificationService = {
  getNotifications(options = {}) {
    if (runtimeConfig.useApi) return apiClient.get('/notifications').then(normalize)
    return simulateRequest(notifications, { ...options, delay: options.delay ?? 300, errorMessage: 'Notifications could not be loaded.' })
  },
  async markRead(id, options = {}) {
    if (runtimeConfig.useApi) return normalize(await apiClient.patch(`/notifications/${encodeURIComponent(id)}/read`, {}))
    const item = notifications.find((notification) => notification.id === id)
    if (!item) throw new Error('Notification was not found.')
    const saved = await simulateRequest({ ...item, read: true }, { ...options, delay: options.delay ?? 180 })
    notifications = notifications.map((notification) => notification.id === id ? saved : notification)
    return clone(saved)
  },
  async markAllRead(options = {}) {
    if (runtimeConfig.useApi) return normalize(await apiClient.patch('/notifications/read-all', {}))
    await simulateRequest(true, { ...options, delay: options.delay ?? 220 })
    notifications = notifications.map((notification) => ({ ...notification, read: true }))
    return clone(notifications)
  },
}
