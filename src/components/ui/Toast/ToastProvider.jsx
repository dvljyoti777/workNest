import { useCallback, useMemo, useState } from 'react'
import Toast from './Toast'
import { ToastContext } from './ToastContext'
import styles from './Toast.module.css'

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const dismiss = useCallback((id) => setToasts((current) => current.filter((toast) => toast.id !== id)), [])
  const showToast = useCallback((message, type = 'success') => {
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { id, message, type }])
  }, [])
  const value = useMemo(() => ({ showToast }), [showToast])

  return <ToastContext.Provider value={value}>{children}<div className={styles.viewport} aria-live="polite" aria-atomic="false">{toasts.map((toast) => <Toast key={toast.id} {...toast} onDismiss={dismiss} />)}</div></ToastContext.Provider>
}
