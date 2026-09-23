import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { queryClient } from './lib/queryClient.js'
import ErrorBoundary from './components/errors/ErrorBoundary/ErrorBoundary.jsx'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import { ToastProvider } from './components/ui/Toast/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastProvider><AuthProvider><ErrorBoundary><App /></ErrorBoundary></AuthProvider></ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
