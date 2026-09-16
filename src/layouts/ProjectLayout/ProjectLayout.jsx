import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './ProjectLayout.module.css'

function ProjectLayout() {
  const { projectId } = useParams()
  const { can } = useAuth()
  return <section><header className={styles.header}><p>Project / {projectId}</p><h1>Website Redesign</h1></header><nav className={styles.tabs} aria-label="Project sections"><NavLink to="overview">Overview</NavLink><NavLink to="tasks">Tasks</NavLink>{can('project:manage-members') && <NavLink to="members">Members</NavLink>}</nav><Outlet /></section>
}

export default ProjectLayout
