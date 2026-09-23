import { useState } from 'react'
import Avatar from '../../ui/Avatar/Avatar'
import { useAuth } from '../../../hooks/useAuth'
import ThemeCustomizer from '../../theme/ThemeCustomizer/ThemeCustomizer'
import styles from './Topbar.module.css'

function Topbar({ onMenuOpen }) {
  const { user } = useAuth()
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  return (
    <header className={styles.topbar}>
      <button className={styles.menuButton} type="button" onClick={onMenuOpen} aria-label="Open navigation" aria-controls="mobile-navigation">☰</button>
      <form className={styles.search} role="search">
        <span aria-hidden="true">⌕</span>
        <label className={styles.visuallyHidden} htmlFor="workspace-search">Search workspace</label>
        <input id="workspace-search" type="search" placeholder="Search projects and tasks" />
      </form>
      <div className={styles.actions}>
        <button className={styles.iconButton} type="button" aria-label="Customize colors and font" aria-expanded={isThemeOpen} onClick={() => setIsThemeOpen((isOpen) => !isOpen)}>Aa</button>
        <button className={styles.iconButton} type="button" aria-label="View notifications">♢<span className={styles.notificationDot} /></button>
        <button className={styles.profileButton} type="button" aria-label="Open user menu"><Avatar name={user.name} size="small" /><span>{user.name.split(' ')[0]}</span><span aria-hidden="true">v</span></button>
      </div>
      {isThemeOpen && <ThemeCustomizer onClose={() => setIsThemeOpen(false)} />}
    </header>
  )
}

export default Topbar
