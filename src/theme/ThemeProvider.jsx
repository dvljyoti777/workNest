import { useLayoutEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'
import { colorThemes, fontThemes } from './themeOptions'

const THEME_KEY = 'worknest_theme'

function getStoredTheme() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(THEME_KEY))
    return {
      color: colorThemes.some((option) => option.id === stored?.color) ? stored.color : 'ocean',
      font: fontThemes.some((option) => option.id === stored?.font) ? stored.font : 'inter',
    }
  } catch {
    return { color: 'ocean', font: 'inter' }
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getStoredTheme)
  const color = colorThemes.find((option) => option.id === theme.color) ?? colorThemes[0]
  const font = fontThemes.find((option) => option.id === theme.font) ?? fontThemes[0]

  useLayoutEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--color-primary', color.primary)
    root.style.setProperty('--color-primary-hover', color.primaryHover)
    root.style.setProperty('--color-primary-soft', color.soft)
    root.style.setProperty('--color-sidebar', color.sidebar)
    root.style.setProperty('--font-family', font.value)
    root.dataset.themeColor = color.id
    root.dataset.themeFont = font.id
    window.localStorage.setItem(THEME_KEY, JSON.stringify(theme))
  }, [color, font, theme])

  const setColor = (colorId) => setTheme((current) => ({ ...current, color: colorId }))
  const setFont = (fontId) => setTheme((current) => ({ ...current, font: fontId }))

  return <ThemeContext.Provider value={{ theme, colorThemes, fontThemes, setColor, setFont }}>{children}</ThemeContext.Provider>
}
