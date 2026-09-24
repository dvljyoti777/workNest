import { useState } from 'react'
import { useToast } from '../../hooks/useToast'
import styles from './SettingsPage.module.css'

const SETTINGS_KEY = 'worknest_preferences'
const defaults = { workspaceName: 'WorkNest Demo', defaultTaskView: 'board' }

function getPreferences() {
  try { return { ...defaults, ...JSON.parse(window.localStorage.getItem(SETTINGS_KEY)) } } catch { return defaults }
}

function SettingsPage() {
  const [preferences, setPreferences] = useState(getPreferences)
  const { showToast } = useToast()
  const update = (event) => setPreferences((current) => ({ ...current, [event.target.name]: event.target.value }))
  const save = (event) => {
    event.preventDefault()
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(preferences))
    showToast('Workspace preferences saved')
  }
  return <section><header className={styles.heading}><h1>Settings</h1><p>Manage workspace preferences and permissions.</p></header><form className={styles.card} onSubmit={save}><label>Workspace name<input name="workspaceName" value={preferences.workspaceName} onChange={update} required /></label><label>Default task view<select name="defaultTaskView" value={preferences.defaultTaskView} onChange={update}><option value="board">Board</option><option value="list">List</option></select></label><button type="submit">Save preferences</button></form></section>
}

export default SettingsPage
