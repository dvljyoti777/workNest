import NavItem from '../../navigation/NavItem/NavItem'
import Avatar from '../../ui/Avatar/Avatar'
import styles from './Sidebar.module.css'

const primaryNavigation = [
  { label: 'Dashboard', href: '#dashboard', icon: '⌂', active: true },
  { label: 'Projects', href: '#projects', icon: '▦' },
  { label: 'My Tasks', href: '#tasks', icon: '✓' },
  { label: 'Team', href: '#team', icon: '♙' },
]
const secondaryNavigation = [
  { label: 'Notifications', href: '#notifications', icon: '○' },
  { label: 'Settings', href: '#settings', icon: '⚙' },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} aria-label="Main navigation">
      <div className={styles.brandRow}>
        <a className={styles.brand} href="#dashboard" onClick={onClose}><span className={styles.brandMark} aria-hidden="true">W</span><span>WorkNest</span></a>
        <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close navigation">×</button>
      </div>
      <nav className={styles.navigation} aria-label="Workspace">
        <p className={styles.navigationLabel}>Workspace</p>
        {primaryNavigation.map((item) => <NavItem key={item.label} {...item} onClick={onClose} />)}
      </nav>
      <nav className={`${styles.navigation} ${styles.secondary}`} aria-label="Account">
        {secondaryNavigation.map((item) => <NavItem key={item.label} {...item} onClick={onClose} />)}
      </nav>
      <div className={styles.profile}>
        <Avatar name="Aarav Sharma" />
        <div className={styles.profileText}><strong>Aarav Sharma</strong><span>Project Manager</span></div>
        <button className={styles.moreButton} type="button" aria-label="Open profile menu">•••</button>
      </div>
    </aside>
  )
}

export default Sidebar
