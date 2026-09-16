import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar/Sidebar'
import Topbar from '../../components/layout/Topbar/Topbar'
import styles from './DashboardLayout.module.css'

function DashboardLayout() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  useEffect(() => {
    if (!isNavigationOpen) return undefined
    const closeOnEscape = (event) => event.key === 'Escape' && setIsNavigationOpen(false)
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isNavigationOpen])

  return <div className={styles.shell}><div id="mobile-navigation"><Sidebar isOpen={isNavigationOpen} onClose={() => setIsNavigationOpen(false)} /></div>{isNavigationOpen && <button className={styles.backdrop} type="button" onClick={() => setIsNavigationOpen(false)} aria-label="Close navigation" />}<div className={styles.workspace}><Topbar onMenuOpen={() => setIsNavigationOpen(true)} /><main className={styles.main}><Outlet /></main></div></div>
}

export default DashboardLayout
