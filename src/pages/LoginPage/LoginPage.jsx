import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './LoginPage.module.css'

const roles = ['admin', 'manager', 'member', 'viewer']

function LoginPage() {
  const [role, setRole] = useState('manager')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      await login({ role })
      navigate(location.state?.from?.pathname ?? '/dashboard', { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return <div className={styles.card}><p className={styles.eyebrow}>Demo access</p><h2>Welcome back</h2><p className={styles.intro}>Choose a role to explore its permissions. No password is required.</p><form onSubmit={handleSubmit}><fieldset><legend>Sign in as</legend><div className={styles.roles}>{roles.map((option) => <label className={role === option ? styles.selected : ''} key={option}><input type="radio" name="role" value={option} checked={role === option} onChange={(event) => setRole(event.target.value)} /><span>{option}</span></label>)}</div></fieldset>{error && <p className={styles.error} role="alert">{error}</p>}<button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Continue to WorkNest'}</button></form><small>Fake login is isolated behind authService for future API replacement.</small></div>
}

export default LoginPage
