import { useEffect, useState } from 'react'
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
  const changePassword = (payload) => authService.changePassword(payload)
  const can = (permission) => hasPermission(session?.user.role, permission)
  useEffect(() => {
    const clearUnauthorizedSession = () => setSession(null)
    window.addEventListener('worknest:unauthorized', clearUnauthorizedSession)
    return () => window.removeEventListener('worknest:unauthorized', clearUnauthorizedSession)
  }, [])
  return <AuthContext.Provider value={{ user: session?.user ?? null, isAuthenticated: Boolean(session), login, logout, changePassword, can }}>{children}</AuthContext.Provider>
}
