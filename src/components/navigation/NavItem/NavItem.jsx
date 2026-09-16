import styles from './NavItem.module.css'
import { NavLink } from 'react-router-dom'

function NavItem({ to, icon, label, onClick }) {
  return <NavLink className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`} to={to} onClick={onClick}><span className={styles.icon} aria-hidden="true">{icon}</span><span>{label}</span></NavLink>
}

export default NavItem
