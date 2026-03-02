# Learning Tracker SPA

A modern, distraction-free learning productivity application to help students and self-learners build consistent study habits.

## Author

**Tanmay Sharma**

## Overview

Learning Tracker SPA provides a focused workflow for planning daily goals, running study sessions, tracking streaks, analyzing progress, and writing reflections. The project is fully frontend-based, with data persisted in browser storage.

## Key Features

- Daily goal management with categories (`coding`, `reading`, `projects`, `revision`, `other`)
- One-click goal templates (DSA, Reading, Projects, Revision)
- Customizable target minutes for each goal
- Study session timer with start, pause, and stop/save actions
- Session notes (short note saved with each study session)
- 90-day streak heatmap for consistency tracking
- Weekly and monthly progress charts
- Daily learning journal with date-based reflections
- Calendar-based monthly journal view with quick date selection and entry indicators
- Milestone badge tracking (streaks, sessions, hours)
- Advanced insights (average session length, best day, consistency score, total hours)
- Export and import data as JSON, export sessions as CSV
- Optional smart reminders via browser notifications for missed daily target
- Light and dark theme support with saved preference
- Responsive and accessible interface (focus states, skip link, keyboard shortcuts)

## Tech Stack

- React.js
- TypeScript
- React Router
- Chart.js (`react-chartjs-2`)
- `date-fns`
- LocalStorage API
- Vite

## Application Routes

- `/` — Landing page
- `/dashboard` — Main tracker dashboard
- `/progress` — Weekly and monthly analytics
- `/journal` — Daily reflection notes

## Project Structure

```text
src/
  components/
  hooks/
  pages/
  utils/
  App.tsx
  main.tsx
  index.css
  types.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Data Persistence

- Study data key: `learning-tracker-state-v1`
- Theme key: `learning-tracker-theme`
- Reminder settings key: `learning-tracker-reminders`
- Runtime validation is applied before using persisted state.
- Storage write/read failures are safely handled with user-facing warnings.

## Security and Reliability

- Safe JSON serialization/deserialization for persisted data
- Shape validation for LocalStorage payload
- React-rendered text content to reduce XSS risk
- Graceful fallback to default state if corrupted data is detected

## Accessibility

- Skip link to main content
- Visible keyboard focus styles
- Keyboard navigation shortcuts:
  - `Alt + 1` Home
  - `Alt + 2` Dashboard
  - `Alt + 3` Progress
  - `Alt + 4` Journal

## Deployment

This project can be deployed as a static site on platforms such as Vercel or Netlify.

- Build command: `npm run build`
- Output directory: `dist`

## License

This project is made for internship project submission.
