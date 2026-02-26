# Learning Tracker SPA

A modern, distraction-free learning productivity application to help students and self-learners build consistent study habits.

## Author

**Tanmay Sharma**

## Overview

Learning Tracker SPA provides a focused workflow for planning daily goals, running study sessions, tracking streaks, analyzing progress, and writing reflections. The project is fully frontend-based, with data persisted in browser storage.

## Key Features

- Daily goal management with categories (`coding`, `reading`, `projects`, `other`)
- Customizable target minutes for each goal
- Study session timer with start, pause, and stop/save actions
- 90-day streak heatmap for consistency tracking
- Weekly and monthly progress charts
- Daily learning journal with date-based reflections
- Milestone badge tracking (streaks, sessions, hours)
- Export data as JSON and CSV
- Light and dark theme support with saved preference
- Responsive interface for desktop and mobile

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
- Runtime validation is applied before using persisted state.
- Storage write/read failures are safely handled with user-facing warnings.

## Security and Reliability

- Safe JSON serialization/deserialization for persisted data
- Shape validation for LocalStorage payload
- React-rendered text content to reduce XSS risk
- Graceful fallback to default state if corrupted data is detected

## Deployment

This project can be deployed as a static site on platforms such as Vercel or Netlify.

- Build command: `npm run build`
- Output directory: `dist`

## License

This project is provided for educational and portfolio use.
