import { useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  validate?: (value: unknown) => value is T,
) {
  const [value, setValue] = useState<T>(initialValue)
  const [storageError, setStorageError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) {
        return
      }

      const parsed = JSON.parse(raw) as unknown

      // Validate persisted data to prevent malformed state from breaking the UI.
      if (!validate || validate(parsed)) {
        setValue(parsed as T)
      } else {
        console.warn(`[storage] Validation failed for key: ${key}`)
      }
    } catch (error) {
      console.error('[storage] Failed to read key:', key, error)
      setStorageError('Failed to load saved data. Using defaults.')
    }
  }, [key, validate])

  const updateValue = (updater: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = updater instanceof Function ? updater(prev) : updater

      try {
        localStorage.setItem(key, JSON.stringify(next))
        setStorageError(null)
      } catch (error) {
        // Quota issues are surfaced to the UI and logged for troubleshooting.
        console.error('[storage] Failed to save key:', key, error)
        setStorageError('Storage limit reached or unavailable. Data may not persist.')
      }

      return next
    })
  }

  return { value, setValue: updateValue, storageError }
}
