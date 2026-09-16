import styles from './StatCard.module.css'

function StatCard({ label, value, helper, icon, tone = 'purple' }) {
  return (
    <article className={styles.card}>
      <div className={`${styles.icon} ${styles[tone]}`} aria-hidden="true">{icon}</div>
      <div>
        <p className={styles.label}>{label}</p>
        <strong className={styles.value}>{value}</strong>
        {helper && <p className={styles.helper}>{helper}</p>}
      </div>
    </article>
  )
}

export default StatCard
