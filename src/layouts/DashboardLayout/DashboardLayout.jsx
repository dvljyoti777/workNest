import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar/Sidebar'
import Topbar from '../../components/layout/Topbar/Topbar'
import WorkspaceTabs from '../../components/navigation/WorkspaceTabs/WorkspaceTabs'
import styles from './DashboardLayout.module.css'

const SIDEBAR_KEY = 'worknest_sidebar_collapsed'

function getStoredSidebarState() {
  return window.localStorage.getItem(SIDEBAR_KEY) === 'true'
}

function DashboardLayout() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(getStoredSidebarState)
  const toggleSidebar = () => setIsSidebarCollapsed((current) => {
    const next = !current
    window.localStorage.setItem(SIDEBAR_KEY, String(next))
    return next
  })
  useEffect(() => {
    if (!isNavigationOpen) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setIsNavigationOpen(false)
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isNavigationOpen])

  return <div className={styles.shell}><a className={styles.skipLink} href="#main-content">Skip to main content</a><div id="mobile-navigation"><Sidebar isOpen={isNavigationOpen} isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} onClose={() => setIsNavigationOpen(false)} /></div>{isNavigationOpen && <button className={styles.backdrop} type="button" onClick={() => setIsNavigationOpen(false)} aria-label="Close navigation" />}<div className={`${styles.workspace} ${isSidebarCollapsed ? styles.workspaceCollapsed : ''}`}><Topbar isNavigationOpen={isNavigationOpen} onMenuOpen={() => setIsNavigationOpen(true)} /><WorkspaceTabs /><main className={styles.main} id="main-content" tabIndex="-1"><Outlet /></main></div></div>
}

export default DashboardLayout
