const QUOTES = [
  'Small progress every day compounds into big results.',
  'Consistency beats intensity when building habits.',
  'You do not need more time, you need fewer distractions.',
  'The best learners show up even on low-motivation days.',
  'Focus on the system, and the goals will follow.',
]

export const getQuoteForDay = (seed: number): string => QUOTES[seed % QUOTES.length]

export const getProgressInsight = (streakDays: number, weeklyMinutes: number): string => {
  if (streakDays >= 30) {
    return `Amazing consistency. A ${streakDays}-day streak shows strong learning discipline.`
  }

  if (streakDays >= 7) {
    return `Great momentum. You're building a reliable routine with a ${streakDays}-day streak.`
  }

  if (weeklyMinutes >= 300) {
    return 'Strong week. You crossed 5+ hours of study time in the past 7 days.'
  }

  if (weeklyMinutes > 0) {
    return 'Good start. Keep sessions short and frequent to build momentum.'
  }

  return 'Start with a 15-minute session today to ignite your streak.'
}
