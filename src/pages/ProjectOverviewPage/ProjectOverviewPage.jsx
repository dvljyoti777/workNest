import { useParams } from 'react-router-dom'
import styles from './ProjectOverviewPage.module.css'

function ProjectOverviewPage() {
  const { projectId } = useParams()
  return <div className={styles.grid}><article><p>Status</p><strong>In progress</strong></article><article><p>Project ID</p><strong>{projectId}</strong></article><article><p>Completion</p><strong>75%</strong></article></div>
}

export default ProjectOverviewPage
