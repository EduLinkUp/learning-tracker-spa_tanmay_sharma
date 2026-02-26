import { Link } from 'react-router-dom'
import { HeroIllustration, JournalIllustration, MetricIllustration } from '../components/Illustrations'

export const LandingPage = () => {
  return (
    <main className="landing">
      <section className="landing-hero card">
        <div>
          <p className="eyebrow">Learning Tracker SPA</p>
          <h2>Build consistent study habits with clarity.</h2>
          <p className="muted">
            Set your daily goals, run focused sessions, track streaks, and reflect on your progress in one
            focused workspace.
          </p>
          <div className="button-row">
            <Link className="cta-btn" to="/dashboard">
              Open Dashboard
            </Link>
            <Link className="secondary-link" to="/progress">
              View Progress
            </Link>
          </div>
        </div>
        <HeroIllustration />
      </section>

      <section className="landing-features">
        <article className="card">
          <MetricIllustration />
          <h3>Plan Daily</h3>
          <p className="muted">Create category-based goals and set realistic daily study targets.</p>
        </article>
        <article className="card">
          <MetricIllustration />
          <h3>Track Consistency</h3>
          <p className="muted">Measure streaks with a visual heatmap and weekly/monthly charts.</p>
        </article>
        <article className="card">
          <JournalIllustration />
          <h3>Reflect Better</h3>
          <p className="muted">Write daily notes to capture outcomes, blockers, and next steps.</p>
        </article>
      </section>
    </main>
  )
}
