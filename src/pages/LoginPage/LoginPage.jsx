import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from '../../features/auth/LoginForm/LoginForm'
import { useAuth } from '../../hooks/useAuth'
import styles from './LoginPage.module.css'

function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (credentials) => {
    setIsSubmitting(true)
    setError('')
    try {
      await login(credentials)
      navigate(location.state?.from?.pathname ?? '/dashboard', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return <div className={styles.card}><div className={styles.mobileBrand}><span>W</span> WorkNest</div><p className={styles.eyebrow}>WorkNest access</p><h2>Welcome back</h2><p className={styles.intro}>Sign in to continue to your workspace.</p><LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} error={error} /></div>
}

export default LoginPage
