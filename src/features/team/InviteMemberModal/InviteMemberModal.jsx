import { useState } from 'react'
import RoleDropdown from '../RoleDropdown/RoleDropdown'
import styles from './InviteMemberModal.module.css'

function InviteMemberModal({ onClose, onInvite, isSaving, error }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'member', team: 'Product', message: '' })
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = async (event) => { event.preventDefault(); await onInvite(form) }

  return <div className={styles.backdrop} onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="invite-title"><header><div><p>Team access</p><h2 id="invite-title">Invite member</h2></div><button type="button" onClick={onClose} aria-label="Close invite dialog">×</button></header><form onSubmit={submit}><div className={styles.row}><label>Name<input name="name" value={form.name} onChange={update} placeholder="Full name" required /></label><label>Email<input name="email" type="email" value={form.email} onChange={update} placeholder="name@company.com" required /></label></div><div className={styles.row}><label>Role<RoleDropdown value={form.role} label="New member role" onChange={(role) => setForm((current) => ({ ...current, role }))} /></label><label>Team<select name="team" value={form.team} onChange={update}><option>Product</option><option>Design</option><option>Engineering</option><option>Marketing</option><option>Support</option></select></label></div><label>Message <small>(optional)</small><textarea name="message" value={form.message} onChange={update} rows="3" placeholder="Add a personal message…" /></label>{error && <p className={styles.error} role="alert">{error.message}</p>}<footer><button type="button" onClick={onClose}>Cancel</button><button className={styles.primary} type="submit" disabled={isSaving}>{isSaving ? 'Sending…' : 'Send invite'}</button></footer></form></section></div>
}

export default InviteMemberModal
