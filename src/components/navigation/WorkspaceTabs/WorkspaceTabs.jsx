import { useSyncExternalStore } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './WorkspaceTabs.module.css'

const TABS_KEY = 'worknest_workspace_tabs'
const dashboardTab = { path: '/dashboard', label: 'Dashboard', pinned: true }

function getTab(pathname) {
  if (pathname === '/dashboard') return dashboardTab
  if (pathname === '/projects') return { path: pathname, label: 'Projects' }
  if (pathname === '/projects/new') return { path: pathname, label: 'New project' }
  if (/^\/projects\/[^/]+\/tasks$/.test(pathname)) return { path: pathname, label: 'Project tasks' }
  if (/^\/projects\/[^/]+\/members$/.test(pathname)) return { path: pathname, label: 'Project members' }
  if (/^\/projects\/[^/]+/.test(pathname)) return { path: pathname, label: 'Project overview' }
  const labels = { '/tasks': 'My tasks', '/team': 'Team', '/notifications': 'Notifications', '/reports': 'Reports', '/settings': 'Settings' }
  return { path: pathname, label: labels[pathname] ?? 'WorkNest' }
}

function getStoredTabs() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(TABS_KEY))
    return Array.isArray(stored) && stored.length ? stored : [dashboardTab]
  } catch { return [dashboardTab] }
}

let tabStore
const listeners = new Set()
const getSnapshot = () => {
  if (!tabStore) tabStore = getStoredTabs()
  return tabStore
}
const subscribe = (listener) => { listeners.add(listener); return () => listeners.delete(listener) }
const saveTabs = (next, notify = true) => {
  tabStore = next
  window.localStorage.setItem(TABS_KEY, JSON.stringify(next))
  if (notify) listeners.forEach((listener) => listener())
}
const ensureTab = (tab) => {
  const existing = getSnapshot()
  if (!existing.some((item) => item.path === tab.path)) saveTabs([...existing, tab], false)
}

function WorkspaceTabs() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  ensureTab(getTab(pathname))
  const tabs = useSyncExternalStore(subscribe, getSnapshot, () => [dashboardTab])

  const closeTab = (event, path) => {
    event.stopPropagation()
    const existing = getSnapshot()
    const closingIndex = existing.findIndex((tab) => tab.path === path)
    const next = existing.filter((tab) => tab.path !== path)
    saveTabs(next)
    if (path === pathname) {
      const fallback = next[Math.min(closingIndex, next.length - 1)] ?? dashboardTab
      navigate(fallback.path)
    }
  }

  return <nav className={styles.tabs} aria-label="Open workspace tabs"><div className={styles.scroller}>{tabs.map((tab) => <div className={`${styles.tab} ${pathname === tab.path ? styles.active : ''}`} key={tab.path}><button className={styles.openButton} type="button" onClick={() => navigate(tab.path)} aria-current={pathname === tab.path ? 'page' : undefined}><span className={styles.pageIcon} aria-hidden="true" />{tab.label}</button>{!tab.pinned && <button className={styles.closeButton} type="button" onClick={(event) => closeTab(event, tab.path)} aria-label={`Close ${tab.label} tab`}>×</button>}</div>)}</div></nav>
}

export default WorkspaceTabs
