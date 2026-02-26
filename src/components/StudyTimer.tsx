import { useEffect, useMemo, useState } from 'react'
import type { Goal } from '../types'

interface StudyTimerProps {
  goals: Goal[]
  onComplete: (goalId: string, seconds: number) => void
}

const formatSeconds = (seconds: number) => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')
  return `${hrs}:${mins}:${secs}`
}

export const StudyTimer = ({ goals, onComplete }: StudyTimerProps) => {
  const activeGoals = useMemo(() => goals.filter((goal) => goal.isActive), [goals])
  const [selectedGoalId, setSelectedGoalId] = useState('')
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (activeGoals.length > 0 && !selectedGoalId) {
      setSelectedGoalId(activeGoals[0].id)
    }
  }, [activeGoals, selectedGoalId])

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const interval = window.setInterval(() => {
      setSeconds((previous) => previous + 1)
    }, 1000)

    return () => window.clearInterval(interval)
  }, [isRunning])

  const stopAndSave = () => {
    if (selectedGoalId && seconds > 0) {
      onComplete(selectedGoalId, seconds)
    }

    setIsRunning(false)
    setSeconds(0)
  }

  return (
    <section className="card">
      <h2>Study Session Timer</h2>
      <p className="timer-value">{formatSeconds(seconds)}</p>

      <label>
        Goal
        <select
          value={selectedGoalId}
          onChange={(event) => setSelectedGoalId(event.target.value)}
          disabled={activeGoals.length === 0}
        >
          {activeGoals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.title}
            </option>
          ))}
        </select>
      </label>

      <div className="button-row">
        <button onClick={() => setIsRunning(true)} disabled={isRunning || activeGoals.length === 0}>
          Start
        </button>
        <button className="secondary-btn" onClick={() => setIsRunning(false)} disabled={!isRunning}>
          Pause
        </button>
        <button className="danger-btn" onClick={stopAndSave} disabled={seconds === 0}>
          Stop & Save
        </button>
      </div>
    </section>
  )
}
