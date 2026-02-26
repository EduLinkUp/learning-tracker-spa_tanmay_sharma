import type { LearningState } from '../types'

const isString = (value: unknown): value is string => typeof value === 'string'
const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)
const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

export const isLearningState = (value: unknown): value is LearningState => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as LearningState

  if (!Array.isArray(candidate.goals) || !Array.isArray(candidate.sessions) || !Array.isArray(candidate.journal)) {
    return false
  }

  const validGoals = candidate.goals.every((goal) =>
    isString(goal.id) &&
    isString(goal.title) &&
    isString(goal.category) &&
    isNumber(goal.dailyTargetMinutes) &&
    isString(goal.createdAt) &&
    isBoolean(goal.isActive),
  )

  const validSessions = candidate.sessions.every((session) =>
    isString(session.id) &&
    isString(session.goalId) &&
    isString(session.startedAt) &&
    isString(session.endedAt) &&
    isNumber(session.durationSeconds) &&
    isString(session.dateKey) &&
    (session.note === undefined || isString(session.note)),
  )

  const validJournal = candidate.journal.every((entry) =>
    isString(entry.dateKey) && isString(entry.content) && isString(entry.updatedAt),
  )

  return validGoals && validSessions && validJournal
}
