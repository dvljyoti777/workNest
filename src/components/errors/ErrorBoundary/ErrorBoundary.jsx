import { Component } from 'react'
import styles from './ErrorBoundary.module.css'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('WorkNest render error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <main className={styles.fallback}><span aria-hidden="true">!</span><h1>Something went wrong</h1><p>WorkNest could not render this screen. Reload the application to try again.</p><button type="button" onClick={() => window.location.reload()}>Reload WorkNest</button></main>
    }
    return this.props.children
  }
}

export default ErrorBoundary
