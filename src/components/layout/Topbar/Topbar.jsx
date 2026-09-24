import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useNotificationsQuery } from '../../../queries/notificationQueries'
import NotificationMenu from '../../notifications/NotificationMenu/NotificationMenu'
import UserProfileMenu from '../../profile/UserProfileMenu/UserProfileMenu'
import ThemeCustomizer from '../../theme/ThemeCustomizer/ThemeCustomizer'
import Avatar from '../../ui/Avatar/Avatar'
import styles from './Topbar.module.css'

function SearchIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></svg> }
function BellIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></svg> }

function Topbar({ onMenuOpen, isNavigationOpen = false }) {
  const { user, can } = useAuth()
  const canViewNotifications = can('notifications:view')
  const notificationsQuery = useNotificationsQuery(canViewNotifications)
  const unreadCount = (notificationsQuery.data ?? []).filter((item) => !item.read).length
  const [openPanel, setOpenPanel] = useState(null)
  const togglePanel = (panel) => setOpenPanel((current) => current === panel ? null : panel)

  useEffect(() => {
    if (!openPanel) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setOpenPanel(null)
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [openPanel])

  return <header className={styles.topbar}><button className={styles.menuButton} type="button" onClick={onMenuOpen} aria-label="Open navigation" aria-controls="mobile-navigation" aria-expanded={isNavigationOpen}><span /><span /><span /></button><form className={styles.search} role="search" onSubmit={(event) => event.preventDefault()}><SearchIcon /><label className={styles.visuallyHidden} htmlFor="workspace-search">Search workspace</label><input id="workspace-search" type="search" placeholder="Search projects and tasks" /></form><div className={styles.actions}><div className={styles.themeControl}><button className={`${styles.iconButton} ${openPanel === 'theme' ? styles.activeButton : ''}`} type="button" aria-label="Customize colors and font" aria-haspopup="dialog" aria-expanded={openPanel === 'theme'} onClick={() => togglePanel('theme')}><span className={styles.letters}>Aa</span></button>{openPanel === 'theme' && <ThemeCustomizer onClose={() => setOpenPanel(null)} />}</div>{canViewNotifications && <div className={styles.notificationControl}><button className={`${styles.iconButton} ${openPanel === 'notifications' ? styles.activeButton : ''}`} type="button" aria-label={unreadCount ? `View notifications, ${unreadCount} unread` : 'View notifications'} aria-haspopup="dialog" aria-expanded={openPanel === 'notifications'} onClick={() => togglePanel('notifications')}><BellIcon />{unreadCount > 0 && <span className={styles.notificationCount}>{unreadCount > 9 ? '9+' : unreadCount}</span>}</button>{openPanel === 'notifications' && <NotificationMenu onClose={() => setOpenPanel(null)} />}</div>}<div className={styles.divider} /><div className={styles.profileControl}><button className={`${styles.profileButton} ${openPanel === 'profile' ? styles.activeButton : ''}`} type="button" aria-label={`View profile for ${user.name}`} aria-haspopup="dialog" aria-expanded={openPanel === 'profile'} onClick={() => togglePanel('profile')}><Avatar name={user.name} size="small" /><span className={styles.profileText}><strong>{user.name.split(' ')[0]}</strong><small>{user.role}</small></span><span className={styles.chevron} aria-hidden="true" /></button>{openPanel === 'profile' && <UserProfileMenu onClose={() => setOpenPanel(null)} />}</div></div></header>
}

export default Topbar
