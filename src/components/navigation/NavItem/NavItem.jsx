import styles from './NavItem.module.css'

function NavItem({ href, icon, label, active = false, onClick }) {
  return <a className={`${styles.item} ${active ? styles.active : ''}`} href={href} aria-current={active ? 'page' : undefined} onClick={onClick}><span className={styles.icon} aria-hidden="true">{icon}</span><span>{label}</span></a>
}

export default NavItem
