import {
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  format,
  isSameDay,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns'

export const toDateKey = (date: Date): string => format(date, 'yyyy-MM-dd')

export const fromDateKey = (dateKey: string): Date => new Date(`${dateKey}T00:00:00`)

export const getLastNDays = (days: number): Date[] => {
  const today = startOfDay(new Date())
  const start = subDays(today, days - 1)
  return eachDayOfInterval({ start, end: today })
}

export const getLastNMonths = (months: number): { start: Date; end: Date; label: string }[] => {
  const current = new Date()
  return Array.from({ length: months }, (_, index) => {
    const monthDate = subMonths(current, months - 1 - index)
    return {
      start: startOfMonth(monthDate),
      end: endOfMonth(monthDate),
      label: format(monthDate, 'MMM'),
    }
  })
}

export const isDateKeyToday = (dateKey: string): boolean => isSameDay(fromDateKey(dateKey), new Date())

export const getTodayKey = (): string => toDateKey(new Date())

export const formatReadableDate = (dateKey: string): string => format(fromDateKey(dateKey), 'EEE, MMM d, yyyy')

export const toMinutes = (seconds: number): number => Math.max(0, Math.round(seconds / 60))

export const getRangeForRecentDays = (days: number): { start: Date; end: Date } => ({
  start: subDays(startOfDay(new Date()), days - 1),
  end: endOfDay(new Date()),
})
