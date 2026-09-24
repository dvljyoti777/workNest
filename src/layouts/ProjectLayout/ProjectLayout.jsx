import { NavLink, Outlet, useParams } from 'react-router-dom'
import ResourceState from '../../components/ui/ResourceState/ResourceState'
import { useAuth } from '../../hooks/useAuth'
import { useProjectsQuery } from '../../queries/projectQueries'
import styles from './ProjectLayout.module.css'

function ProjectLayout() {
  const { projectId } = useParams()
  const { can } = useAuth()
  const projectsQuery = useProjectsQuery()
  const project = projectsQuery.data?.find((item) => item.id === projectId)
  if (projectsQuery.isPending) return <ResourceState type="loading" />
  if (projectsQuery.isError) return <ResourceState type="error" title="Project unavailable" message={projectsQuery.error.message} onRetry={() => projectsQuery.refetch()} />
  if (!project) return <ResourceState type="empty" title="Project not found" message="This project may have been deleted or the link is incorrect." />
  return <section><header className={styles.header}><p>Project / {project.id}</p><h1>{project.name}</h1><span>{project.description}</span></header><nav className={styles.tabs} aria-label="Project sections"><NavLink to="overview">Overview</NavLink><NavLink to="tasks">Tasks</NavLink>{can('project:manage-members') && <NavLink to="members">Members</NavLink>}</nav><Outlet context={{ project }} /></section>
}

export default ProjectLayout
