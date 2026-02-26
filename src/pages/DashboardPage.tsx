import { BadgeList } from '../components/BadgeList'
import { ExportPanel } from '../components/ExportPanel'
import { GoalForm } from '../components/GoalForm'
import { GoalList } from '../components/GoalList'
import { Heatmap } from '../components/Heatmap'
import { MetricIllustration } from '../components/Illustrations'
import { StudyTimer } from '../components/StudyTimer'
import type { Goal, JournalEntry, StudySession } from '../types'
import { buildCsvExport, buildJsonExport, downloadFile } from '../utils/exportData'

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
  onAddGoal: (title: string, category: Goal['category'], targetMinutes: number) => void
  onUpdateTarget: (goalId: string, minutes: number) => void
  onToggleGoal: (goalId: string) => void
  onAddSession: (goalId: string, seconds: number) => void
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
  onAddGoal,
  onUpdateTarget,
  onToggleGoal,
  onAddSession,
}: DashboardPageProps) => {
  const exportJson = () => {
    const content = buildJsonExport({ goals, sessions, journal })
    downloadFile(content, 'learning-tracker-data.json', 'application/json')
  }

  const exportCsv = () => {
    const content = buildCsvExport(sessions)
    downloadFile(content, 'learning-tracker-sessions.csv', 'text/csv')
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
      <StudyTimer goals={goals} onComplete={onAddSession} />
      <Heatmap data={heatmap} />
      <BadgeList badges={milestones} />
      <ExportPanel onExportJson={exportJson} onExportCsv={exportCsv} />
    </main>
  )
}
