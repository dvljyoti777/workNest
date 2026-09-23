import { useState } from 'react'
import RoleSelector from '../RoleSelector/RoleSelector'
import styles from './LoginForm.module.css'

function LoginForm({ onSubmit, isSubmitting, error }) {
  const [role, setRole] = useState('manager')
  const [email, setEmail] = useState('manager@worknest.demo')
  const [password, setPassword] = useState('worknest')
  const [showPassword, setShowPassword] = useState(false)

  const handleRoleChange = (nextRole) => {
    setRole(nextRole)
    setEmail(`${nextRole}@worknest.demo`)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ role, email, password })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}><label htmlFor="email">Email</label><input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div>
      <div className={styles.field}><div className={styles.labelRow}><label htmlFor="password">Password</label><span>Demo credentials</span></div><div className={styles.password}><input id="password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required minLength="4" /><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div></div>
      <label className={styles.remember}><input type="checkbox" defaultChecked /> Remember me</label>
      <div className={styles.rolePanel}><RoleSelector value={role} onChange={handleRoleChange} disabled={isSubmitting} /></div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button className={styles.submit} type="submit" disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign in'}</button>
      <p className={styles.demoNote}>Demo mode · Selected role decides your permissions.</p>
    </form>
  )
}

export default LoginForm
