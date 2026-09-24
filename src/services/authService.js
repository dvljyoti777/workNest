import { runtimeConfig } from '../config/runtimeConfig'
import { apiClient } from '../lib/apiClient'

const SESSION_KEY = 'worknest_session'
const demoUsers = {
  admin: { id: 'user-admin', name: 'Ananya Admin', email: 'admin@worknest.demo', role: 'admin' },
  manager: { id: 'user-manager', name: 'Aarav Sharma', email: 'manager@worknest.demo', role: 'manager' },
  member: { id: 'user-member', name: 'Meera Joshi', email: 'member@worknest.demo', role: 'member' },
  viewer: { id: 'user-viewer', name: 'Vihaan Shah', email: 'viewer@worknest.demo', role: 'viewer' },
}
const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds))

export const authService = {
  getSession() {
    const savedSession = window.localStorage.getItem(SESSION_KEY)
    try { return savedSession ? JSON.parse(savedSession) : null } catch { window.localStorage.removeItem(SESSION_KEY); return null }
  },
  async login(credentials) {
    if (runtimeConfig.useApi) {
      const response = await apiClient.post('/auth/login', credentials)
      const payload = response?.data ?? response
      if (!payload?.token || !payload?.user) throw new TypeError('Invalid authentication response payload.')
      const session = { token: payload.token, user: payload.user }
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      return session
    }
    const { role } = credentials
    await wait(450)
    const user = demoUsers[role]
    if (!user) throw new Error('Please select a valid demo role.')
    const session = { user, token: `fake-token-${user.id}` }
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return session
  },
  async logout() {
    if (runtimeConfig.useApi) {
      try { await apiClient.post('/auth/logout') } finally { window.localStorage.removeItem(SESSION_KEY) }
      return
    }
    window.localStorage.removeItem(SESSION_KEY)
  },
  async changePassword(payload) {
    if (runtimeConfig.useApi) {
      await apiClient.put('/auth/password', {
        currentPassword: payload.currentPassword,
        password: payload.newPassword,
        passwordConfirmation: payload.confirmPassword,
      })
      return { success: true }
    }
    await wait(500)
    if (payload.currentPassword !== 'worknest') throw new Error('Current demo password is incorrect.')
    if (payload.newPassword.length < 8) throw new Error('New password must contain at least 8 characters.')
    return { success: true }
  },
}
