import { ProgressCharts } from '../components/ProgressCharts'
import type { MonthlyPoint, WeeklyPoint } from '../types'

interface ProgressPageProps {
  weekly: WeeklyPoint[]
  monthly: MonthlyPoint[]
  weeklyMinutes: number
}

export const ProgressPage = ({ weekly, monthly, weeklyMinutes }: ProgressPageProps) => {
  return (
    <main className="page-grid">
      <section className="card">
        <h2>Progress Overview</h2>
        <p>
          You studied <strong>{weeklyMinutes}</strong> minutes in the last 7 days.
        </p>
        <p className="muted">Use the trends below to identify your most consistent periods.</p>
      </section>
      <ProgressCharts weekly={weekly} monthly={monthly} />
    </main>
  )
}
