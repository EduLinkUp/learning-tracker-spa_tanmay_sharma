interface InsightsPanelProps {
  averageSessionMinutes: number
  bestStudyDay: string
  consistencyScore: number
  totalStudyHours: number
}

export const InsightsPanel = ({
  averageSessionMinutes,
  bestStudyDay,
  consistencyScore,
  totalStudyHours,
}: InsightsPanelProps) => {
  return (
    <section className="card">
      <h2>Advanced Insights</h2>
      <div className="insights-grid">
        <article>
          <h3>Average Session</h3>
          <p>{averageSessionMinutes} min</p>
        </article>
        <article>
          <h3>Best Study Day</h3>
          <p>{bestStudyDay}</p>
        </article>
        <article>
          <h3>Consistency Score</h3>
          <p>{consistencyScore}%</p>
        </article>
        <article>
          <h3>Total Study Time</h3>
          <p>{totalStudyHours} hrs</p>
        </article>
      </div>
    </section>
  )
}
