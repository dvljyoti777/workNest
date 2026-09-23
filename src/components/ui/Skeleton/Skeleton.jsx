import styles from './Skeleton.module.css'

function Skeleton({ count = 3 }) {
  return <div className={styles.grid} role="status" aria-label="Loading content"><span className={styles.visuallyHidden}>Loading content</span>{Array.from({ length: count }, (_, index) => <div className={styles.card} key={index} aria-hidden="true"><span className={styles.block} /><span className={styles.line} /><span className={styles.shortLine} /></div>)}</div>
}

export default Skeleton
