import { useState } from 'react'
import { hasPermission } from '../auth/permissions'
import { authService } from '../services/authService'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => authService.getSession())
  const login = async (credentials) => {
    const nextSession = await authService.login(credentials)
    setSession(nextSession)
    return nextSession
  }
  const logout = async () => {
    await authService.logout()
    setSession(null)
  }
  const can = (permission) => hasPermission(session?.user.role, permission)
  return <AuthContext.Provider value={{ user: session?.user ?? null, isAuthenticated: Boolean(session), login, logout, can }}>{children}</AuthContext.Provider>
}
