interface Badge {
  label: string
  unlocked: boolean
}

interface BadgeListProps {
  badges: Badge[]
}

export const BadgeList = ({ badges }: BadgeListProps) => {
  return (
    <section className="card">
      <h2>Milestone Badges</h2>
      <ul className="badge-list">
        {badges.map((badge) => (
          <li key={badge.label} className={badge.unlocked ? 'unlocked' : 'locked'}>
            {badge.label} - {badge.unlocked ? 'Unlocked' : 'Locked'}
          </li>
        ))}
      </ul>
    </section>
  )
}
