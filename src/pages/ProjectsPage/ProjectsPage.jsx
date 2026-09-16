import { Link } from 'react-router-dom'
import { dashboardData } from '../../data/dashboardData'
import styles from './ProjectsPage.module.css'

function ProjectsPage() {
  return <section><header className={styles.heading}><h1>Projects</h1><p>Choose a project to open its nested overview, tasks and members routes.</p></header><div className={styles.grid}>{dashboardData.projects.map((project) => <article key={project.id}><span style={{ backgroundColor: project.color }} /><h2>{project.name}</h2><p>{project.tasks.completed} of {project.tasks.total} tasks completed</p><Link to={`/projects/${project.id}/overview`}>Open project</Link></article>)}</div></section>
}

export default ProjectsPage
