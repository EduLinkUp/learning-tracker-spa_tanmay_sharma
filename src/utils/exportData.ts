import type { Goal, JournalEntry, StudySession } from '../types'

interface ExportPayload {
  goals: Goal[]
  sessions: StudySession[]
  journal: JournalEntry[]
}

export const buildJsonExport = (payload: ExportPayload): string =>
  JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      ...payload,
    },
    null,
    2,
  )

export const buildCsvExport = (sessions: StudySession[]): string => {
  const header = 'sessionId,goalId,date,durationSeconds\n'
  const rows = sessions
    .map((session) => `${session.id},${session.goalId},${session.dateKey},${session.durationSeconds}`)
    .join('\n')

  return `${header}${rows}`
}

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)

  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()

  URL.revokeObjectURL(url)
}
