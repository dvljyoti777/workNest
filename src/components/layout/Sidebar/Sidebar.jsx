import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import NavItem from '../../navigation/NavItem/NavItem'
import Avatar from '../../ui/Avatar/Avatar'
import styles from './Sidebar.module.css'

function SidebarIcon({ name }) {
  const paths = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    projects: <><path d="M3 7h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M3 7V5a2 2 0 0 1 2-2h5l2 2h3" /></>,
    tasks: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="m8 8 1.5 1.5L12 7M8 14l1.5 1.5L12 13M14 9h3M14 15h3" /></>,
    team: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 20c0-4 2.5-6 6-6s6 2 6 6M15 15c3.5 0 6 1.7 6 5" /></>,
    notifications: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    reports: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19 15a2 2 0 0 0 .4 2l-2.8 2.8a2 2 0 0 0-2-.4A2 2 0 0 0 13 21h-4a2 2 0 0 0-1.6-1.6 2 2 0 0 0-2 .4L2.6 17a2 2 0 0 0 .4-2A2 2 0 0 0 1 13V9a2 2 0 0 0 2-1.6 2 2 0 0 0-.4-2L5.4 2.6a2 2 0 0 0 2 .4A2 2 0 0 0 9 1h4a2 2 0 0 0 1.6 2 2 2 0 0 0 2-.4l2.8 2.8a2 2 0 0 0-.4 2A2 2 0 0 0 21 9v4a2 2 0 0 0-2 2Z" /></>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: <SidebarIcon name="dashboard" />, permission: 'dashboard:view' },
  { label: 'Projects', to: '/projects', icon: <SidebarIcon name="projects" />, permission: 'projects:view' },
  { label: 'My Tasks', to: '/tasks', icon: <SidebarIcon name="tasks" />, permission: 'tasks:view' },
  { label: 'Team', to: '/team', icon: <SidebarIcon name="team" />, permission: 'team:view' },
]
const accountNavigation = [
  { label: 'Notifications', to: '/notifications', icon: <SidebarIcon name="notifications" />, permission: 'notifications:view' },
  { label: 'Reports', to: '/reports', icon: <SidebarIcon name="reports" />, permission: 'reports:view' },
  { label: 'Settings', to: '/settings', icon: <SidebarIcon name="settings" />, permission: 'settings:view' },
]

function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }) {
  const { user, can, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => { await logout(); onClose(); navigate('/login', { replace: true }) }

  return <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''} ${isCollapsed ? styles.collapsed : ''}`} aria-label="Main navigation"><div className={styles.brandRow}><Link className={styles.brand} to="/dashboard" onClick={onClose}><span className={styles.brandMark}>W</span><span className={styles.brandName}>WorkNest</span></Link><button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close navigation">×</button></div><nav className={styles.navigation} aria-label="Workspace"><p className={styles.navigationLabel}>Workspace</p>{navigation.filter((item) => can(item.permission)).map((item) => <NavItem key={item.to} {...item} onClick={onClose} isCollapsed={isCollapsed} />)}</nav><nav className={`${styles.navigation} ${styles.secondary}`} aria-label="Account">{accountNavigation.filter((item) => can(item.permission)).map((item) => <NavItem key={item.to} {...item} onClick={onClose} isCollapsed={isCollapsed} />)}</nav><button className={styles.collapseButton} type="button" onClick={onToggleCollapse} aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!isCollapsed}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={isCollapsed ? 'm9 6 6 6-6 6' : 'm15 6-6 6 6 6'} /></svg><span>{isCollapsed ? 'Expand' : 'Collapse sidebar'}</span></button><div className={styles.profile}><Avatar name={user.name} /><div className={styles.profileText}><strong>{user.name}</strong><span>{user.role}</span></div><button className={styles.moreButton} type="button" onClick={handleLogout} aria-label="Log out" title="Log out"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17l5-5-5-5M15 12H3M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" /></svg><span className={styles.exitLabel}>Exit</span></button></div></aside>
}

export default Sidebar
