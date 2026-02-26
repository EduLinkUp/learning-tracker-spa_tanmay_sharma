export type Category = 'coding' | 'reading' | 'projects' | 'other'

export type ThemeMode = 'light' | 'dark'

export interface Goal {
  id: string
  title: string
  category: Category
  dailyTargetMinutes: number
  createdAt: string
  isActive: boolean
}

export interface StudySession {
  id: string
  goalId: string
  startedAt: string
  endedAt: string
  durationSeconds: number
  dateKey: string
}

export interface JournalEntry {
  dateKey: string
  content: string
  updatedAt: string
}

export interface LearningState {
  goals: Goal[]
  sessions: StudySession[]
  journal: JournalEntry[]
}

export interface WeeklyPoint {
  label: string
  minutes: number
}

export interface MonthlyPoint {
  label: string
  minutes: number
}
