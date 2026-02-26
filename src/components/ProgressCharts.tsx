import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'
import { useMemo } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import type { MonthlyPoint, WeeklyPoint } from '../types'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend)

interface ProgressChartsProps {
  weekly: WeeklyPoint[]
  monthly: MonthlyPoint[]
}

export const ProgressCharts = ({ weekly, monthly }: ProgressChartsProps) => {
  const weeklyData = useMemo(
    () => ({
      labels: weekly.map((item) => item.label),
      datasets: [
        {
          label: 'Weekly Minutes',
          data: weekly.map((item) => item.minutes),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.2)',
          tension: 0.3,
        },
      ],
    }),
    [weekly],
  )

  const monthlyData = useMemo(
    () => ({
      labels: monthly.map((item) => item.label),
      datasets: [
        {
          label: 'Monthly Minutes',
          data: monthly.map((item) => item.minutes),
          backgroundColor: '#10b981',
        },
      ],
    }),
    [monthly],
  )

  return (
    <section className="charts-grid">
      <article className="card">
        <h2>Weekly Trend</h2>
        <Line data={weeklyData} />
      </article>

      <article className="card">
        <h2>Monthly Trend</h2>
        <Bar data={monthlyData} />
      </article>
    </section>
  )
}
