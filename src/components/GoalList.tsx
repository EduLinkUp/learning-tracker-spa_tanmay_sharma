import type { Goal } from '../types'

interface GoalListProps {
  goals: Goal[]
  onToggleGoal: (goalId: string) => void
  onUpdateTarget: (goalId: string, minutes: number) => void
}

export const GoalList = ({ goals, onToggleGoal, onUpdateTarget }: GoalListProps) => {
  return (
    <section className="card">
      <h2>Goals by Category</h2>
      {goals.length === 0 ? (
        <p className="muted">No goals yet. Add one above to begin tracking.</p>
      ) : (
        <ul className="goal-list">
          {goals.map((goal) => (
            <li key={goal.id} className={!goal.isActive ? 'inactive' : ''}>
              <div>
                <strong>{goal.title}</strong>
                <span className="pill">{goal.category}</span>
              </div>

              <label>
                Target (min)
                <input
                  type="number"
                  min={5}
                  max={600}
                  value={goal.dailyTargetMinutes}
                  onChange={(event) => onUpdateTarget(goal.id, Number(event.target.value))}
                />
              </label>

              <button className="secondary-btn" onClick={() => onToggleGoal(goal.id)}>
                {goal.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
