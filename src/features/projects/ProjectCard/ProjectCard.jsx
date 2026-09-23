import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

function ProjectCard({ project, view = 'grid', canManage, onEdit, onDelete }) {
  const progress = project.tasks.total === 0 ? 0 : Math.round((project.tasks.completed / project.tasks.total) * 100)
  const dueDate = project.dueDate ? new Date(project.dueDate) : null
  const formattedDate = dueDate && !Number.isNaN(dueDate.getTime())
    ? new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(dueDate)
    : 'No due date'

  return (
    <article className={`${styles.card} ${styles[view]}`}>
      <div className={styles.icon} style={{ '--project-color': project.color }} aria-hidden="true">P</div>
      <div className={styles.content}>
        <div className={styles.titleRow}><div><span className={styles.status}>{project.status ?? 'planning'}</span><h2>{project.name}</h2></div>{canManage && <div className={styles.actions}><button type="button" onClick={() => onEdit(project)} aria-label={`Edit ${project.name}`}>Edit</button><button type="button" onClick={() => onDelete(project)} aria-label={`Delete ${project.name}`}>Delete</button></div>}</div>
        <p className={styles.description}>{project.description || 'No description provided.'}</p>
        <div className={styles.meta}><span>Due <strong>{formattedDate}</strong></span><span>{project.tasks.completed}/{project.tasks.total} tasks</span></div>
        <div className={styles.footer}><div className={styles.members} aria-label={`${project.members?.length ?? 0} project members`}>{(project.members ?? []).slice(0, 3).map((member) => <span key={member}>{member}</span>)}{project.members?.length > 3 && <small>+{project.members.length - 3}</small>}</div><Link to={`/projects/${project.id}/overview`}>Open project</Link></div>
      </div>
      <div className={styles.progress} style={{ '--progress': progress }} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress} aria-label={`${project.name} is ${progress}% complete`}><span>{progress}%</span></div>
    </article>
  )
}

export default ProjectCard
