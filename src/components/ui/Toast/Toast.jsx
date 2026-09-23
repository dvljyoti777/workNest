import { useEffect } from 'react'
import styles from './Toast.module.css'

function Toast({ id, message, type, onDismiss }) {
  useEffect(() => {
    const timer = window.setTimeout(() => onDismiss(id), 3500)
    return () => window.clearTimeout(timer)
  }, [id, onDismiss])

  return <div className={`${styles.toast} ${styles[type]}`} role={type === 'error' ? 'alert' : 'status'}><span aria-hidden="true">{type === 'error' ? '!' : '✓'}</span><strong>{message}</strong><button type="button" onClick={() => onDismiss(id)} aria-label="Dismiss notification">×</button></div>
}

export default Toast
