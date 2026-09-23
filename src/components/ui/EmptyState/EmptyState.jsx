import styles from '../StateMessage/StateMessage.module.css'

function EmptyState({ title = 'Nothing here yet', message, actionLabel, onAction }) {
  return <section className={styles.message} role="status"><span className={styles.emptyIcon} aria-hidden="true">□</span><h2>{title}</h2><p>{message}</p>{onAction && <button type="button" onClick={onAction}>{actionLabel ?? 'Get started'}</button>}</section>
}

export default EmptyState
