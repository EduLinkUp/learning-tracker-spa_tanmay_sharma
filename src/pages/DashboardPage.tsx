import { useState } from 'react'
import { BadgeList } from '../components/BadgeList'
import { ExportPanel } from '../components/ExportPanel'
import { GoalForm } from '../components/GoalForm'
import { GoalList } from '../components/GoalList'
import { Heatmap } from '../components/Heatmap'
import { InsightsPanel } from '../components/InsightsPanel'
import { MetricIllustration } from '../components/Illustrations'
import { ReminderPanel } from '../components/ReminderPanel'
import { StudyTimer } from '../components/StudyTimer'
import type { Goal, JournalEntry, StudySession } from '../types'
import { buildCsvExport, buildJsonExport, downloadFile } from '../utils/exportData'
import { formatReadableDate } from '../utils/date'

interface DashboardPageProps {
  goals: Goal[]
  sessions: StudySession[]
  journal: JournalEntry[]
  todayMinutes: number
  dailyTarget: number
  streakDays: number
  quote: string
  insight: string
  heatmap: { dateKey: string; minutes: number }[]
  milestones: { label: string; unlocked: boolean }[]
  advancedInsights: {
    averageSessionMinutes: number
    bestStudyDay: string
    consistencyScore: number
    totalStudyHours: number
  }
  onAddGoal: (title: string, category: Goal['category'], targetMinutes: number) => void
  onUpdateTarget: (goalId: string, minutes: number) => void
  onToggleGoal: (goalId: string) => void
  onAddSession: (goalId: string, seconds: number, note?: string) => void
  onImportState: (payload: unknown) => boolean
  recentSessionNotes: Array<{ id: string; dateKey: string; note: string }>
  reminderEnabled: boolean
  reminderHour: number
  reminderPermission: NotificationPermission | 'unsupported'
  onReminderToggle: (enabled: boolean) => void
  onReminderHourChange: (hour: number) => void
  onRequestReminderPermission: () => void
}

export const DashboardPage = ({
  goals,
  sessions,
  journal,
  todayMinutes,
  dailyTarget,
  streakDays,
  quote,
  insight,
  heatmap,
  milestones,
  advancedInsights,
  onAddGoal,
  onUpdateTarget,
  onToggleGoal,
  onAddSession,
  onImportState,
  recentSessionNotes,
  reminderEnabled,
  reminderHour,
  reminderPermission,
  onReminderToggle,
  onReminderHourChange,
  onRequestReminderPermission,
}: DashboardPageProps) => {
  const [importStatus, setImportStatus] = useState('')

  const exportJson = () => {
    const content = buildJsonExport({ goals, sessions, journal })
    downloadFile(content, 'learning-tracker-data.json', 'application/json')
  }

  const exportCsv = () => {
    const content = buildCsvExport(sessions)
    downloadFile(content, 'learning-tracker-sessions.csv', 'text/csv')
  }

  const importJson = async (file: File) => {
    try {
      const raw = await file.text()
      const parsed = JSON.parse(raw) as unknown
      const success = onImportState(parsed)
      setImportStatus(success ? 'Data imported successfully.' : 'Invalid file structure. Import failed.')
    } catch {
      setImportStatus('Unable to read JSON file. Please use a valid export file.')
    }
  }

  return (
    <main className="page-grid">
      <section className="stats-grid">
        <article className="stat-card">
          <h3>Today</h3>
          <p>
            {todayMinutes} / {dailyTarget || 0} min
          </p>
        </article>
        <article className="stat-card">
          <h3>Streak</h3>
          <p>{streakDays} days</p>
        </article>
        <article className="stat-card">
          <h3>Sessions</h3>
          <p>{sessions.length}</p>
        </article>
      </section>

      <section className="card quote-card">
        <div>
          <h2>Motivation</h2>
          <p>“{quote}”</p>
          <p className="muted">{insight}</p>
        </div>
        <MetricIllustration />
      </section>

      <GoalForm onAddGoal={onAddGoal} />
      <GoalList goals={goals} onToggleGoal={onToggleGoal} onUpdateTarget={onUpdateTarget} />
      <ReminderPanel
        enabled={reminderEnabled}
        hour={reminderHour}
        notificationPermission={reminderPermission}
        onToggleEnabled={onReminderToggle}
        onChangeHour={onReminderHourChange}
        onRequestPermission={onRequestReminderPermission}
      />
      <StudyTimer goals={goals} onComplete={onAddSession} />

      <section className="card">
        <h2>Recent Session Notes</h2>
        {recentSessionNotes.length === 0 ? (
          <p className="muted">No session notes yet. Add one when you stop a timer session.</p>
        ) : (
          <ul className="notes-list">
            {recentSessionNotes.map((entry) => (
              <li key={entry.id}>
                <strong>{formatReadableDate(entry.dateKey)}</strong>
                <p>{entry.note}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Heatmap data={heatmap} />
      <InsightsPanel {...advancedInsights} />
      <BadgeList badges={milestones} />
      <ExportPanel
        onExportJson={exportJson}
        onExportCsv={exportCsv}
        onImportJson={importJson}
        importStatus={importStatus}
      />
    </main>
  )
}
