import { useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { useLearningTracker } from './hooks/useLearningTracker'
import { useTheme } from './hooks/useTheme'
import { DashboardPage } from './pages/DashboardPage'
import { JournalPage } from './pages/JournalPage'
import { LandingPage } from './pages/LandingPage'
import { ProgressPage } from './pages/ProgressPage'

function App() {
  const tracker = useLearningTracker()
  const { theme, toggleTheme } = useTheme()

  const getJournalContent = useCallback(
    (dateKey: string) => tracker.journalByDate.get(dateKey)?.content ?? '',
    [tracker.journalByDate],
  )

  return (
    <div className="app-shell">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      {tracker.storageError && (
        <div className="storage-warning" role="alert">
          {tracker.storageError}
        </div>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              goals={tracker.goals}
              sessions={tracker.sessions}
              journal={tracker.journal}
              todayMinutes={tracker.todayMinutes}
              dailyTarget={tracker.dailyTarget}
              streakDays={tracker.streakDays}
              quote={tracker.quote}
              insight={tracker.insight}
              heatmap={tracker.dailyHeatmap}
              milestones={tracker.milestones}
              onAddGoal={tracker.addGoal}
              onUpdateTarget={tracker.updateGoalTarget}
              onToggleGoal={tracker.toggleGoalActive}
              onAddSession={tracker.addSession}
            />
          }
        />
        <Route
          path="/progress"
          element={
            <ProgressPage
              weekly={tracker.weeklyTrend}
              monthly={tracker.monthlyTrend}
              weeklyMinutes={tracker.weeklyMinutes}
            />
          }
        />
        <Route
          path="/journal"
          element={
            <JournalPage
              getJournalContent={getJournalContent}
              onSaveEntry={tracker.upsertJournalEntry}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
