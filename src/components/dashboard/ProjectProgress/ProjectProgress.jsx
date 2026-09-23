import { Link } from 'react-router-dom'
import styles from './ProjectProgress.module.css'

function ProjectProgress({ projects }) {
  const totalTasks = projects.reduce((total, project) => total + project.tasks.total, 0)
  const completedTasks = projects.reduce((total, project) => total + project.tasks.completed, 0)
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)
  const projectHealth = projects.reduce((summary, project) => {
    const percentage = project.tasks.total === 0 ? 0 : (project.tasks.completed / project.tasks.total) * 100
    if (percentage >= 60) summary.onTrack += 1
    else if (percentage >= 35) summary.atRisk += 1
    else summary.delayed += 1
    return summary
  }, { onTrack: 0, atRisk: 0, delayed: 0 })

  return (
    <section className={styles.card} aria-labelledby="project-progress-title">
      <header><div><h2 id="project-progress-title">Project progress</h2><p>Across active projects</p></div><Link to="/projects">View all</Link></header>
      <div className={styles.content}>
        <div className={styles.donut} style={{ '--progress': progress }} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress} aria-label={`Overall project progress ${progress}%`}>
          <div><strong>{progress}%</strong><span>Avg. progress</span></div>
        </div>
        <ul>
          <li><span className={styles.onTrack} />On track<strong>{projectHealth.onTrack}</strong></li>
          <li><span className={styles.atRisk} />At risk<strong>{projectHealth.atRisk}</strong></li>
          <li><span className={styles.delayed} />Delayed<strong>{projectHealth.delayed}</strong></li>
        </ul>
      </div>
    </section>
  )
}

export default ProjectProgress
