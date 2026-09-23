import { useAuth } from '../../hooks/useAuth'
import Dashboard from '../../features/dashboard/Dashboard'
import { Link } from 'react-router-dom'
import styles from './DashboardPage.module.css'

function DashboardPage() {
  const { user, can } = useAuth()
  return <><header className={styles.header}><div><p>Workspace overview</p><h1>Good morning, {user.name.split(' ')[0]}</h1><span>Here is what is happening across your workspace today.</span></div>{can('projects:create') && <Link to="/projects/new">+ New project</Link>}</header><Dashboard /></>
}

export default DashboardPage
