import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import Dashboard from '../../../features/dashboard/Dashboard'
import styles from './AppShell.module.css'

function AppShell({ isNavigationOpen, onNavigationOpen, onNavigationClose }) {
  return (
    <div className={styles.shell}>
      <div id="mobile-navigation"><Sidebar isOpen={isNavigationOpen} onClose={onNavigationClose} /></div>
      {isNavigationOpen && <button className={styles.backdrop} type="button" onClick={onNavigationClose} aria-label="Close navigation" />}
      <div className={styles.workspace}>
        <Topbar onMenuOpen={onNavigationOpen} />
        <main className={styles.main} id="main-content">
          <header className={styles.pageHeader}>
            <div><p className={styles.eyebrow}>Tuesday, 16 September</p><h1>Good morning, Aarav</h1><p>Here’s what’s happening across your workspace today.</p></div>
            <button className={styles.primaryButton} type="button"><span aria-hidden="true">＋</span> New project</button>
          </header>
          <Dashboard />
        </main>
      </div>
    </div>
  )
}

export default AppShell
