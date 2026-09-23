import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './AuthLayout.module.css'

function AuthLayout() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <main className={styles.layout}><section className={styles.brandPanel} aria-label="About WorkNest"><div className={styles.brand}><span className={styles.logo}>W</span><span>WorkNest</span></div><div className={styles.message}><p className={styles.kicker}>Plan · Collaborate · Deliver</p><h1>One calm place for work that matters.</h1><p>Bring projects, tasks and your team together with clear roles and focused workflows.</p><div className={styles.preview} aria-hidden="true"><span /><span /><span /></div></div><small>Trusted demo workspace for growing teams</small></section><section className={styles.formPanel}><Outlet /></section></main>
}

export default AuthLayout
