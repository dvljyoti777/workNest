import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './AuthLayout.module.css'

function AuthLayout() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <main className={styles.layout}><section className={styles.brandPanel}><span className={styles.logo}>W</span><h1>WorkNest</h1><p>Bring projects, tasks and your team together in one calm workspace.</p></section><section className={styles.formPanel}><Outlet /></section></main>
}

export default AuthLayout
