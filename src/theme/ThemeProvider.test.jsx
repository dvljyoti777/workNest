import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useTheme } from '../hooks/useTheme'
import { ThemeProvider } from './ThemeProvider'

function ThemeProbe() {
  const { setFont } = useTheme()
  return <button type="button" onClick={() => setFont('manrope')}>Use rounded font</button>
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.style.removeProperty('--font-family')
    delete document.documentElement.dataset.themeFont
  })

  it('applies and stores the selected font globally', async () => {
    const user = userEvent.setup()
    render(<ThemeProvider><ThemeProbe /></ThemeProvider>)
    await user.click(screen.getByRole('button', { name: 'Use rounded font' }))

    await waitFor(() => expect(document.documentElement.dataset.themeFont).toBe('manrope'))
    expect(document.documentElement.style.getPropertyValue('--font-family')).toContain('Trebuchet MS')
    expect(JSON.parse(window.localStorage.getItem('worknest_theme')).font).toBe('manrope')
  })
})
