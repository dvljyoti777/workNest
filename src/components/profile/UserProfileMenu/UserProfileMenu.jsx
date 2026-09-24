import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useToast } from '../../../hooks/useToast'
import Avatar from '../../ui/Avatar/Avatar'
import styles from './UserProfileMenu.module.css'

const emptyForm = { currentPassword: '', newPassword: '', confirmPassword: '' }

function UserProfileMenu({ onClose }) {
  const { user, changePassword } = useAuth()
  const { showToast } = useToast()
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    if (form.newPassword.length < 8) { setError('New password must contain at least 8 characters.'); return }
    if (form.newPassword !== form.confirmPassword) { setError('New password and confirmation do not match.'); return }
    if (form.currentPassword === form.newPassword) { setError('New password must be different from the current password.'); return }
    setIsSaving(true)
    try {
      await changePassword(form)
      setForm(emptyForm)
      setIsChangingPassword(false)
      showToast('Password changed successfully')
    } catch (passwordError) {
      setError(passwordError.message)
    } finally {
      setIsSaving(false)
    }
  }

  return <section className={styles.panel} role="dialog" aria-labelledby="profile-title"><header><div className={styles.identity}><Avatar name={user.name} /><span><h2 id="profile-title">{user.name}</h2><p>{user.email}</p></span></div><button type="button" onClick={onClose} aria-label="Close user profile">×</button></header><dl><div><dt>Role</dt><dd>{user.role}</dd></div><div><dt>User ID</dt><dd>{user.id}</dd></div></dl>{!isChangingPassword ? <button className={styles.changeButton} type="button" onClick={() => setIsChangingPassword(true)}>Change password</button> : <form onSubmit={submit} noValidate><div className={styles.formHeading}><strong>Change password</strong><span>Demo current password: <code>worknest</code></span></div><label>Current password<input name="currentPassword" type="password" value={form.currentPassword} onChange={update} autoComplete="current-password" required autoFocus /></label><label>New password<input name="newPassword" type="password" value={form.newPassword} onChange={update} autoComplete="new-password" minLength="8" required /></label><label>Confirm new password<input name="confirmPassword" type="password" value={form.confirmPassword} onChange={update} autoComplete="new-password" minLength="8" required /></label>{error && <p className={styles.error} role="alert">{error}</p>}<footer><button type="button" disabled={isSaving} onClick={() => { setError(''); setForm(emptyForm); setIsChangingPassword(false) }}>Cancel</button><button className={styles.saveButton} type="submit" disabled={isSaving}>{isSaving ? 'Updating...' : 'Update password'}</button></footer></form>}</section>
}

export default UserProfileMenu
