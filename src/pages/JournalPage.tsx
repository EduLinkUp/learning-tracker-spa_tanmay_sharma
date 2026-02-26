import { useEffect, useState } from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { formatReadableDate, fromDateKey, getTodayKey, toDateKey } from '../utils/date'

interface JournalPageProps {
  getJournalContent: (dateKey: string) => string
  hasJournalEntry: (dateKey: string) => boolean
  onSaveEntry: (dateKey: string, content: string) => void
}

export const JournalPage = ({ getJournalContent, hasJournalEntry, onSaveEntry }: JournalPageProps) => {
  const [dateKey, setDateKey] = useState(getTodayKey())
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')
  const [monthDate, setMonthDate] = useState(fromDateKey(getTodayKey()))

  useEffect(() => {
    setContent(getJournalContent(dateKey))
  }, [dateKey, getJournalContent])

  const handleSave = () => {
    onSaveEntry(dateKey, content)
    setStatus(`Saved for ${formatReadableDate(dateKey)} at ${format(new Date(), 'hh:mm a')}`)
    window.setTimeout(() => setStatus(''), 2200)
  }

  const calendarStart = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 0 })
  const calendarEnd = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 0 })
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  return (
    <main className="page-grid">
      <section className="card">
        <div className="calendar-header">
          <h2>Journal Calendar</h2>
          <div className="button-row">
            <button className="secondary-btn" type="button" onClick={() => setMonthDate((prev) => subMonths(prev, 1))}>
              Previous
            </button>
            <p>{format(monthDate, 'MMMM yyyy')}</p>
            <button className="secondary-btn" type="button" onClick={() => setMonthDate((prev) => addMonths(prev, 1))}>
              Next
            </button>
          </div>
        </div>

        <div className="calendar-grid" role="grid" aria-label="Monthly journal calendar">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => (
            <span key={label} className="calendar-weekday">
              {label}
            </span>
          ))}

          {days.map((day) => {
            const dayKey = toDateKey(day)
            const isSelected = isSameDay(day, fromDateKey(dateKey))
            const hasEntry = hasJournalEntry(dayKey)
            return (
              <button
                key={dayKey}
                type="button"
                className={`calendar-day ${!isSameMonth(day, monthDate) ? 'outside' : ''} ${isSelected ? 'selected' : ''} ${hasEntry ? 'has-entry' : ''}`}
                onClick={() => {
                  setDateKey(dayKey)
                  setMonthDate(day)
                }}
                aria-label={`${format(day, 'MMMM d, yyyy')}${hasEntry ? ' has entry' : ''}`}
              >
                {format(day, 'd')}
              </button>
            )
          })}
        </div>
      </section>

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
