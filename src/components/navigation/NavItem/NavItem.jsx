import styles from './NavItem.module.css'
import { NavLink } from 'react-router-dom'

function NavItem({ to, icon, label, onClick, isCollapsed = false }) {
  return <NavLink className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''} ${isCollapsed ? styles.collapsed : ''}`} to={to} onClick={onClick} aria-label={isCollapsed ? label : undefined} title={isCollapsed ? label : undefined}><span className={styles.icon} aria-hidden="true">{icon}</span><span className={styles.label}>{label}</span></NavLink>
}

export default NavItem
