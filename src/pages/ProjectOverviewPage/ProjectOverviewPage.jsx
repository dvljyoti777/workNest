import { useOutletContext } from 'react-router-dom'
import styles from './ProjectOverviewPage.module.css'

function ProjectOverviewPage() {
  const { project } = useOutletContext()
  const progress = project.tasks.total ? Math.round((project.tasks.completed / project.tasks.total) * 100) : 0
  const dueDate = project.dueDate ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(project.dueDate)) : 'Not set'
  return <div className={styles.grid}><article><p>Status</p><strong>{project.status}</strong></article><article><p>Due date</p><strong>{dueDate}</strong></article><article><p>Completion</p><strong>{progress}%</strong><span>{project.tasks.completed} of {project.tasks.total} tasks</span></article></div>
}

export default ProjectOverviewPage
