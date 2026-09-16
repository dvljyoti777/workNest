import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  const { isAuthenticated } = useAuth()
  return <main className={styles.page}><p>404</p><h1>Page not found</h1><span>The page you requested does not exist or may have moved.</span><Link to={isAuthenticated ? '/dashboard' : '/login'}>{isAuthenticated ? 'Back to dashboard' : 'Go to login'}</Link></main>
}

export default NotFoundPage
