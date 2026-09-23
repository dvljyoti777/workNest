import styles from './SettingsPage.module.css'

function SettingsPage() {
  return <section><header className={styles.heading}><h1>Settings</h1><p>Manage workspace preferences and permissions.</p></header><form className={styles.card}><label>Workspace name<input defaultValue="WorkNest Demo" /></label><label>Default task view<select defaultValue="board"><option value="board">Board</option><option value="list">List</option></select></label><button type="button">Save preferences</button></form></section>
}

export default SettingsPage
