import styles from './ProjectProgress.module.css'

function ProjectProgress({ projects }) {
  return (
    <section className={styles.card} aria-labelledby="project-progress-title">
      <div className={styles.heading}><div><h2 id="project-progress-title">Project progress</h2><p>Your active projects at a glance</p></div><a href="#projects">View all</a></div>
      <div className={styles.list}>
        {projects.map((project) => {
          const progress = project.tasks.total === 0 ? 0 : Math.round((project.tasks.completed / project.tasks.total) * 100)
          return (
            <article className={styles.project} key={project.id}>
              <div className={styles.projectHeading}><div><span className={styles.dot} style={{ backgroundColor: project.color }} /><strong>{project.name}</strong></div><span>Due {project.dueDate}</span></div>
              <div className={styles.track} aria-label={`${project.name}: ${progress}% complete`}><span style={{ width: `${progress}%`, backgroundColor: project.color }} /></div>
              <div className={styles.meta}><span>{project.tasks.completed} of {project.tasks.total} tasks</span><strong>{progress}%</strong></div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ProjectProgress
