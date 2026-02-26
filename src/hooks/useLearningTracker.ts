import { useMemo } from 'react'
import { eachDayOfInterval, format, isWithinInterval, startOfDay, subDays } from 'date-fns'
import { useLocalStorage } from './useLocalStorage'
import type { Category, Goal, JournalEntry, LearningState, MonthlyPoint, StudySession, WeeklyPoint } from '../types'
import { getLastNMonths, getTodayKey, toDateKey } from '../utils/date'
import { isLearningState } from '../utils/storageValidation'
import { getProgressInsight, getQuoteForDay } from '../utils/insights'

const STORAGE_KEY = 'learning-tracker-state-v1'

const DEFAULT_STATE: LearningState = {
  goals: [],
  sessions: [],
  journal: [],
}

const clampMinutes = (minutes: number): number => Math.max(5, Math.min(600, Math.round(minutes)))

export const useLearningTracker = () => {
  const { value: state, setValue: setState, storageError } = useLocalStorage<LearningState>(
    STORAGE_KEY,
    DEFAULT_STATE,
    isLearningState,
  )

  const addGoal = (title: string, category: Category, dailyTargetMinutes: number) => {
    const trimmedTitle = title.trim().slice(0, 80)

    if (!trimmedTitle) {
      return
    }

    const goal: Goal = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      category,
      dailyTargetMinutes: clampMinutes(dailyTargetMinutes),
      createdAt: new Date().toISOString(),
      isActive: true,
    }

    setState((previous) => ({ ...previous, goals: [goal, ...previous.goals] }))
  }

  const updateGoalTarget = (goalId: string, targetMinutes: number) => {
    const safeTarget = clampMinutes(targetMinutes)
    setState((previous) => ({
      ...previous,
      goals: previous.goals.map((goal) =>
        goal.id === goalId ? { ...goal, dailyTargetMinutes: safeTarget } : goal,
      ),
    }))
  }

  const toggleGoalActive = (goalId: string) => {
    setState((previous) => ({
      ...previous,
      goals: previous.goals.map((goal) =>
        goal.id === goalId ? { ...goal, isActive: !goal.isActive } : goal,
      ),
    }))
  }

  const addSession = (goalId: string, durationSeconds: number) => {
    if (durationSeconds <= 0) {
      return
    }

    const now = new Date()
    const session: StudySession = {
      id: crypto.randomUUID(),
      goalId,
      startedAt: now.toISOString(),
      endedAt: now.toISOString(),
      durationSeconds,
      dateKey: toDateKey(now),
    }

    setState((previous) => ({ ...previous, sessions: [session, ...previous.sessions] }))
  }

  const upsertJournalEntry = (dateKey: string, content: string) => {
    const safeContent = content.slice(0, 1200)

    setState((previous) => {
      const existing = previous.journal.find((entry) => entry.dateKey === dateKey)
      const updatedEntry: JournalEntry = {
        dateKey,
        content: safeContent,
        updatedAt: new Date().toISOString(),
      }

      if (!existing) {
        return { ...previous, journal: [updatedEntry, ...previous.journal] }
      }

      return {
        ...previous,
        journal: previous.journal.map((entry) =>
          entry.dateKey === dateKey ? updatedEntry : entry,
        ),
      }
    })
  }

  const todayKey = getTodayKey()

  const minutesByDate = useMemo(() => {
    const map = new Map<string, number>()

    state.sessions.forEach((session) => {
      const previousMinutes = map.get(session.dateKey) ?? 0
      map.set(session.dateKey, previousMinutes + Math.round(session.durationSeconds / 60))
    })

    return map
  }, [state.sessions])

  const dailyHeatmap = useMemo(() => {
    const start = subDays(startOfDay(new Date()), 89)
    const dates = eachDayOfInterval({ start, end: startOfDay(new Date()) })

    return dates.map((date) => {
      const dateKey = format(date, 'yyyy-MM-dd')
      return { dateKey, minutes: minutesByDate.get(dateKey) ?? 0 }
    })
  }, [minutesByDate])

  const todayMinutes = minutesByDate.get(todayKey) ?? 0
  const dailyTarget = state.goals.filter((goal) => goal.isActive).reduce((sum, goal) => sum + goal.dailyTargetMinutes, 0)

  const streakDays = useMemo(() => {
    // Count consecutive days with study activity starting from today and moving backward.
    let streak = 0

    for (let offset = 0; offset < 365; offset += 1) {
      const dateKey = format(subDays(new Date(), offset), 'yyyy-MM-dd')
      const minutes = minutesByDate.get(dateKey) ?? 0

      if (minutes > 0) {
        streak += 1
      } else {
        break
      }
    }

    return streak
  }, [minutesByDate])

  const weeklyTrend = useMemo<WeeklyPoint[]>(() => {
    const start = subDays(startOfDay(new Date()), 6)
    const days = eachDayOfInterval({ start, end: startOfDay(new Date()) })

    return days.map((day) => {
      const dateKey = format(day, 'yyyy-MM-dd')
      return {
        label: format(day, 'EEE'),
        minutes: minutesByDate.get(dateKey) ?? 0,
      }
    })
  }, [minutesByDate])

  const monthlyTrend = useMemo<MonthlyPoint[]>(() => {
    const ranges = getLastNMonths(6)
    return ranges.map((range) => {
      const total = state.sessions.reduce((sum, session) => {
        const date = new Date(session.dateKey)
        if (isWithinInterval(date, { start: range.start, end: range.end })) {
          return sum + Math.round(session.durationSeconds / 60)
        }

        return sum
      }, 0)

      return { label: range.label, minutes: total }
    })
  }, [state.sessions])

  const weeklyMinutes = weeklyTrend.reduce((sum, point) => sum + point.minutes, 0)

  const milestones = useMemo(
    () => [
      { label: '7-day streak', unlocked: streakDays >= 7 },
      { label: '30-day streak', unlocked: streakDays >= 30 },
      { label: '10 study sessions', unlocked: state.sessions.length >= 10 },
      { label: '50 study hours', unlocked: state.sessions.reduce((sum, item) => sum + item.durationSeconds, 0) >= 180000 },
    ],
    [state.sessions, streakDays],
  )

  const quote = getQuoteForDay(new Date().getDate())
  const insight = getProgressInsight(streakDays, weeklyMinutes)

  const journalByDate = useMemo(() => {
    const map = new Map<string, JournalEntry>()
    state.journal.forEach((entry) => map.set(entry.dateKey, entry))
    return map
  }, [state.journal])

  return {
    goals: state.goals,
    sessions: state.sessions,
    journal: state.journal,
    storageError,
    todayMinutes,
    dailyTarget,
    streakDays,
    dailyHeatmap,
    weeklyTrend,
    monthlyTrend,
    weeklyMinutes,
    milestones,
    quote,
    insight,
    journalByDate,
    addGoal,
    updateGoalTarget,
    toggleGoalActive,
    addSession,
    upsertJournalEntry,
  }
}
