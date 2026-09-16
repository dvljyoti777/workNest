import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import NavItem from '../../navigation/NavItem/NavItem'
import Avatar from '../../ui/Avatar/Avatar'
import styles from './Sidebar.module.css'

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: 'D', permission: 'dashboard:view' },
  { label: 'Projects', to: '/projects', icon: 'P', permission: 'projects:view' },
  { label: 'My Tasks', to: '/tasks', icon: 'T', permission: 'tasks:view' },
  { label: 'Team', to: '/team', icon: 'M', permission: 'team:view' },
]
const accountNavigation = [
  { label: 'Notifications', to: '/notifications', icon: 'N', permission: 'notifications:view' },
  { label: 'Settings', to: '/settings', icon: 'S', permission: 'settings:view' },
]

function Sidebar({ isOpen, onClose }) {
  const { user, can, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout()
    onClose()
    navigate('/login', { replace: true })
  }

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} aria-label="Main navigation">
      <div className={styles.brandRow}><Link className={styles.brand} to="/dashboard" onClick={onClose}><span className={styles.brandMark}>W</span><span>WorkNest</span></Link><button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close navigation">x</button></div>
      <nav className={styles.navigation} aria-label="Workspace"><p className={styles.navigationLabel}>Workspace</p>{navigation.filter((item) => can(item.permission)).map((item) => <NavItem key={item.to} {...item} onClick={onClose} />)}</nav>
      <nav className={`${styles.navigation} ${styles.secondary}`} aria-label="Account">{accountNavigation.filter((item) => can(item.permission)).map((item) => <NavItem key={item.to} {...item} onClick={onClose} />)}</nav>
      <div className={styles.profile}><Avatar name={user.name} /><div className={styles.profileText}><strong>{user.name}</strong><span>{user.role}</span></div><button className={styles.moreButton} type="button" onClick={handleLogout} aria-label="Log out">Exit</button></div>
    </aside>
  )
}

export default Sidebar
