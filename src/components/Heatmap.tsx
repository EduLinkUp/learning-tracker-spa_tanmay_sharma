interface HeatmapItem {
  dateKey: string
  minutes: number
}

interface HeatmapProps {
  data: HeatmapItem[]
}

const getIntensityClass = (minutes: number): string => {
  if (minutes === 0) return 'level-0'
  if (minutes < 30) return 'level-1'
  if (minutes < 60) return 'level-2'
  if (minutes < 120) return 'level-3'
  return 'level-4'
}

export const Heatmap = ({ data }: HeatmapProps) => {
  return (
    <section className="card">
      <h2>Streak Heatmap (Last 90 Days)</h2>
      <div className="heatmap-grid" role="img" aria-label="Learning activity heatmap">
        {data.map((item) => (
          <div
            key={item.dateKey}
            className={`heat-cell ${getIntensityClass(item.minutes)}`}
            title={`${item.dateKey}: ${item.minutes} min`}
          />
        ))}
      </div>
      <p className="muted">Darker cells indicate higher study time.</p>
    </section>
  )
}
