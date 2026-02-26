import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { ThemeMode } from '../types'

const THEME_KEY = 'learning-tracker-theme'

const isThemeMode = (value: unknown): value is ThemeMode => value === 'light' || value === 'dark'

export const useTheme = () => {
  const { value: theme, setValue: setTheme } = useLocalStorage<ThemeMode>(THEME_KEY, 'light', isThemeMode)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((previous) => (previous === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}
