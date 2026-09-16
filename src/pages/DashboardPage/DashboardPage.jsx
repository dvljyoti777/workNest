import { useAuth } from '../../hooks/useAuth'
import Dashboard from '../../features/dashboard/Dashboard'
import styles from './DashboardPage.module.css'

function DashboardPage() {
  const { user } = useAuth()
  return <><header className={styles.header}><div><p>Workspace overview</p><h1>Good morning, {user.name.split(' ')[0]}</h1><span>Here is what is happening across your workspace today.</span></div><button type="button">+ New project</button></header><Dashboard /></>
}

export default DashboardPage
