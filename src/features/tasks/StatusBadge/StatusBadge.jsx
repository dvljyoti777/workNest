import styles from './StatusBadge.module.css'

const labels = { backlog: 'To do', todo: 'In progress', in_progress: 'Review', done: 'Done' }

function StatusBadge({ status }) {
  return <span className={`${styles.badge} ${styles[status] ?? ''}`}>{labels[status] ?? status}</span>
}

export default StatusBadge
