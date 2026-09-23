import styles from '../StateMessage/StateMessage.module.css'

function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return <section className={styles.message} role="alert"><span className={styles.errorIcon} aria-hidden="true">!</span><h2>{title}</h2><p>{message}</p>{onRetry && <button type="button" onClick={onRetry}>Retry</button>}</section>
}

export default ErrorState
