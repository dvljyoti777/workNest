import Avatar from '../../ui/Avatar/Avatar'
import styles from './Topbar.module.css'

function Topbar({ onMenuOpen }) {
  return (
    <header className={styles.topbar}>
      <button className={styles.menuButton} type="button" onClick={onMenuOpen} aria-label="Open navigation" aria-controls="mobile-navigation">☰</button>
      <form className={styles.search} role="search">
        <span aria-hidden="true">⌕</span>
        <label className={styles.visuallyHidden} htmlFor="workspace-search">Search workspace</label>
        <input id="workspace-search" type="search" placeholder="Search projects and tasks" />
      </form>
      <div className={styles.actions}>
        <button className={styles.iconButton} type="button" aria-label="View notifications">♢<span className={styles.notificationDot} /></button>
        <button className={styles.profileButton} type="button" aria-label="Open user menu"><Avatar name="Aarav Sharma" size="small" /><span>Aarav</span><span aria-hidden="true">⌄</span></button>
      </div>
    </header>
  )
}

export default Topbar
