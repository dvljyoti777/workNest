import styles from './OverdueCard.module.css'

function OverdueCard({ tasks }) {
  const high = tasks.filter((task) => task.priority === 'high').length
  const medium = tasks.filter((task) => task.priority === 'medium').length
  return <article className={styles.card}><h2>Overdue tasks</h2><strong>{tasks.length}</strong><p>Need attention today</p><div><span><i className={styles.high} />High priority <b>{high}</b></span><span><i className={styles.medium} />Medium priority <b>{medium}</b></span></div></article>
}

export default OverdueCard
