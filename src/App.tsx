import { useCallback, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Header } from './components/Header'
import { useLearningTracker } from './hooks/useLearningTracker'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTheme } from './hooks/useTheme'
import { DashboardPage } from './pages/DashboardPage'
import { JournalPage } from './pages/JournalPage'
import { LandingPage } from './pages/LandingPage'
import { ProgressPage } from './pages/ProgressPage'
import { getTodayKey } from './utils/date'

interface ReminderSettings {
  enabled: boolean
  hour: number
  lastNotifiedDateKey: string | null
}

const isReminderSettings = (value: unknown): value is ReminderSettings => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as ReminderSettings
  return (
    typeof candidate.enabled === 'boolean' &&
    typeof candidate.hour === 'number' &&
    Number.isFinite(candidate.hour) &&
    candidate.hour >= 0 &&
    candidate.hour <= 23 &&
    (candidate.lastNotifiedDateKey === null || typeof candidate.lastNotifiedDateKey === 'string')
  )
}

function App() {
  const tracker = useLearningTracker()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const { value: reminderSettings, setValue: setReminderSettings } = useLocalStorage<ReminderSettings>(
    'learning-tracker-reminders',
    { enabled: false, hour: 20, lastNotifiedDateKey: null },
    isReminderSettings,
  )

  const getJournalContent = useCallback(
    (dateKey: string) => tracker.journalByDate.get(dateKey)?.content ?? '',
    [tracker.journalByDate],
  )

  const hasJournalEntry = useCallback(
    (dateKey: string) => {
      const content = tracker.journalByDate.get(dateKey)?.content ?? ''
      return content.trim().length > 0
    },
    [tracker.journalByDate],
  )

  const reminderPermission: NotificationPermission | 'unsupported' =
    typeof Notification === 'undefined' ? 'unsupported' : Notification.permission

  useEffect(() => {
    if (typeof Notification === 'undefined' || !reminderSettings.enabled) {
      return
    }

    if (Notification.permission !== 'granted') {
      return
    }

    const now = new Date()
    const todayKey = getTodayKey()
    const shouldNotifyTime = now.getHours() >= reminderSettings.hour
    const targetNotMet = tracker.dailyTarget > 0 && tracker.todayMinutes < tracker.dailyTarget
    const alreadyNotified = reminderSettings.lastNotifiedDateKey === todayKey

    if (shouldNotifyTime && targetNotMet && !alreadyNotified) {
      new Notification('Learning Tracker Reminder', {
        body: `You are ${tracker.dailyTarget - tracker.todayMinutes} minutes away from your daily goal.`,
      })

      setReminderSettings((previous) => ({ ...previous, lastNotifiedDateKey: todayKey }))
    }
  }, [
    reminderSettings.enabled,
    reminderSettings.hour,
    reminderSettings.lastNotifiedDateKey,
    setReminderSettings,
    tracker.dailyTarget,
    tracker.todayMinutes,
  ])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return
      }

      if (!event.altKey) {
        return
      }

      if (event.key === '1') {
        event.preventDefault()
        navigate('/')
      }

      if (event.key === '2') {
        event.preventDefault()
        navigate('/dashboard')
      }

      if (event.key === '3') {
        event.preventDefault()
        navigate('/progress')
      }

      if (event.key === '4') {
        event.preventDefault()
        navigate('/journal')
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      {tracker.storageError && (
        <div className="storage-warning" role="alert">
          {tracker.storageError}
        </div>
      )}

      <div id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                goals={tracker.goals}
                sessions={tracker.sessions}
                journal={tracker.journal}
                todayMinutes={tracker.todayMinutes}
                dailyTarget={tracker.dailyTarget}
                streakDays={tracker.streakDays}
                quote={tracker.quote}
                insight={tracker.insight}
                heatmap={tracker.dailyHeatmap}
                milestones={tracker.milestones}
                advancedInsights={tracker.advancedInsights}
                recentSessionNotes={tracker.recentSessionNotes}
                onAddGoal={tracker.addGoal}
                onUpdateTarget={tracker.updateGoalTarget}
                onToggleGoal={tracker.toggleGoalActive}
                onAddSession={tracker.addSession}
                onImportState={tracker.importState}
                reminderEnabled={reminderSettings.enabled}
                reminderHour={reminderSettings.hour}
                reminderPermission={reminderPermission}
                onReminderToggle={(enabled) =>
                  setReminderSettings((previous) => ({
                    ...previous,
                    enabled,
                    lastNotifiedDateKey: enabled ? previous.lastNotifiedDateKey : null,
                  }))
                }
                onReminderHourChange={(hour) =>
                  setReminderSettings((previous) => ({
                    ...previous,
                    hour: Math.max(0, Math.min(23, Math.round(hour) || 0)),
                  }))
                }
                onRequestReminderPermission={() => {
                  if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
                    void Notification.requestPermission()
                  }
                }}
              />
            }
          />
          <Route
            path="/progress"
            element={
              <ProgressPage
                weekly={tracker.weeklyTrend}
                monthly={tracker.monthlyTrend}
                weeklyMinutes={tracker.weeklyMinutes}
              />
            }
          />
          <Route
            path="/journal"
            element={
              <JournalPage
                getJournalContent={getJournalContent}
                hasJournalEntry={hasJournalEntry}
                onSaveEntry={tracker.upsertJournalEntry}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
