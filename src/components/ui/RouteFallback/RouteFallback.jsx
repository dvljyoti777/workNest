import styles from './RouteFallback.module.css'

function RouteFallback() {
  return <div className={styles.fallback} role="status"><span /><p>Loading page...</p></div>
}

export default RouteFallback
