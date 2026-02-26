import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { formatReadableDate, getTodayKey } from '../utils/date'

interface JournalPageProps {
  getJournalContent: (dateKey: string) => string
  onSaveEntry: (dateKey: string, content: string) => void
}

export const JournalPage = ({ getJournalContent, onSaveEntry }: JournalPageProps) => {
  const [dateKey, setDateKey] = useState(getTodayKey())
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    setContent(getJournalContent(dateKey))
  }, [dateKey, getJournalContent])

  const handleSave = () => {
    onSaveEntry(dateKey, content)
    setStatus(`Saved for ${formatReadableDate(dateKey)} at ${format(new Date(), 'hh:mm a')}`)
    window.setTimeout(() => setStatus(''), 2200)
  }

  return (
    <main className="page-grid">
      <section className="card">
        <h2>Learning Journal</h2>
        <p className="muted">Capture what you learned, blockers, and next actions.</p>

        <label>
          Date
          <input type="date" value={dateKey} onChange={(event) => setDateKey(event.target.value)} />
        </label>

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={1200}
          rows={10}
          placeholder="What did you learn today?"
        />

        <div className="button-row">
          <button onClick={handleSave}>Save Reflection</button>
          {status && <span className="success-text">{status}</span>}
        </div>
      </section>
    </main>
  )
}
