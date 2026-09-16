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
    return savedSession ? JSON.parse(savedSession) : null
  },
  async login({ role }) {
    await wait(450)
    const user = demoUsers[role]
    if (!user) throw new Error('Please select a valid demo role.')
    const session = { user, token: `fake-token-${user.id}` }
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return session
  },
  async logout() {
    window.localStorage.removeItem(SESSION_KEY)
  },
}
