import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function PermissionRoute({ permission }) {
  const { can } = useAuth()
  return can(permission) ? <Outlet /> : <Navigate to="/dashboard" replace />
}

export default PermissionRoute
