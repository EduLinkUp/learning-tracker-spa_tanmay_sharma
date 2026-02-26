# Learning Tracker SPA

A distraction-free React + TypeScript single-page app for students and self-learners to build consistent study habits.

## Tech Stack

- React.js + TypeScript
- React Router
- LocalStorage API
- Chart.js (`react-chartjs-2`)
- `date-fns`
- Vite

## Features Implemented

- Daily goal setting with category-based organization (`coding`, `reading`, `projects`, `other`)
- Customizable daily target minutes per goal
- Study session timer with `start`, `pause`, and `stop + save`
- Streak tracking with 90-day visual heatmap calendar
- Progress charts for weekly and monthly study trends
- Journal page with date-wise reflection notes
- Milestone badges (7-day streak, 30-day streak, 10 sessions, 50 study hours)
- Motivational quote + progress insight on dashboard
- LocalStorage persistence with data validation
- Export data as JSON and CSV
- Light/Dark mode with theme persistence
- Responsive design for desktop and mobile

## Project Structure

```text
src/
  components/
    BadgeList.tsx
    ExportPanel.tsx
    GoalForm.tsx
    GoalList.tsx
    Header.tsx
    Heatmap.tsx
    ProgressCharts.tsx
    StudyTimer.tsx
  hooks/
    useLearningTracker.ts
    useLocalStorage.ts
    useTheme.ts
  pages/
    DashboardPage.tsx
    JournalPage.tsx
    ProgressPage.tsx
  utils/
    date.ts
    exportData.ts
    insights.ts
    storageValidation.ts
  App.tsx
  index.css
  main.tsx
  types.ts
```

## Local Development

### 1) Install dependencies

```bash
npm install
```

### 2) Start dev server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Data Persistence Strategy

- All app data is stored under versioned key: `learning-tracker-state-v1`
- Theme preference stored separately under: `learning-tracker-theme`
- `useLocalStorage` hook handles:
  - safe parse/stringify
  - runtime shape validation (`isLearningState`)
  - quota/storage error handling and user-facing warning
- React escapes journal/goal text by default, reducing XSS risk from user-generated content

## Performance Considerations

- Derived metrics are memoized in `useLearningTracker` (`useMemo`)
- Chart datasets are memoized in `ProgressCharts`
- Single source of truth minimizes unnecessary recalculation

## Deployment (Vercel/Netlify)

1. Push code to a GitHub repository.
2. Import repository in Vercel or Netlify.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy and verify routes (`/`, `/progress`, `/journal`).

## Submission Checklist

- [ ] Create a new repo in **EduLinkUp - Developers' Capstone Organisation** and push this project
- [ ] Deploy on Vercel/Netlify
- [ ] Record 3-4 minute narrated demo (goal setting, timer, streak heatmap, journal, charts, export)
- [ ] Push detailed report (`PROJECT_REPORT.md`) in the same repository
- [ ] Submit GitHub repo link + live demo link

## Notes

- This project does not require authentication or backend services.
- Storage is browser-local; clearing browser data will remove saved progress.
