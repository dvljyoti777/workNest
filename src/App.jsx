import { useEffect, useState } from 'react'
import AppShell from './components/layout/AppShell/AppShell'

function App() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  useEffect(() => {
    if (!isNavigationOpen) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsNavigationOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isNavigationOpen])

  return <AppShell isNavigationOpen={isNavigationOpen} onNavigationClose={() => setIsNavigationOpen(false)} onNavigationOpen={() => setIsNavigationOpen(true)} />
}

export default App
