import styles from './StatCard.module.css'

function StatCard({ label, value, trend, trendDirection = 'up', tone = 'blue' }) {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <p className={styles.label}>{label}</p>
      <strong className={styles.value}>{value}</strong>
      {trend && <p className={`${styles.trend} ${styles[trendDirection]}`}><span aria-hidden="true">{trendDirection === 'down' ? '↓' : '↑'}</span>{trend}</p>}
    </article>
  )
}

export default StatCard
