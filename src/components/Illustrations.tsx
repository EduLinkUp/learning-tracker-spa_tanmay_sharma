export const HeroIllustration = () => {
  return (
    <svg viewBox="0 0 420 260" className="illus-svg" role="img" aria-label="Learning dashboard illustration">
      <defs>
        <linearGradient id="cardGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#5b8cff" />
          <stop offset="100%" stopColor="#79d7ff" />
        </linearGradient>
      </defs>
      <rect x="16" y="18" width="388" height="224" rx="16" fill="url(#cardGrad)" opacity="0.18" />
      <rect x="42" y="44" width="338" height="170" rx="14" fill="#ffffff" opacity="0.92" />
      <rect x="64" y="66" width="150" height="10" rx="5" fill="#2457c5" opacity="0.82" />
      <rect x="64" y="86" width="114" height="8" rx="4" fill="#7f93b0" opacity="0.7" />
      <rect x="64" y="122" width="40" height="66" rx="6" fill="#cfe0ff" />
      <rect x="114" y="108" width="40" height="80" rx="6" fill="#a8c4ff" />
      <rect x="164" y="94" width="40" height="94" rx="6" fill="#7fa7ff" />
      <rect x="214" y="78" width="40" height="110" rx="6" fill="#4f81f4" />
      <circle cx="324" cy="114" r="34" fill="#ecf3ff" />
      <path d="M324 93v21l15 11" stroke="#2457c5" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="282" y="162" width="84" height="10" rx="5" fill="#8ea6ca" opacity="0.82" />
      <rect x="282" y="178" width="66" height="8" rx="4" fill="#aab9d2" opacity="0.82" />
    </svg>
  )
}

export const MetricIllustration = () => {
  return (
    <svg viewBox="0 0 160 120" className="feature-illus" role="img" aria-label="Planning illustration">
      <rect x="14" y="12" width="132" height="96" rx="12" fill="#e8f0ff" />
      <rect x="30" y="30" width="68" height="8" rx="4" fill="#3865d6" />
      <rect x="30" y="45" width="54" height="6" rx="3" fill="#7d90b2" />
      <circle cx="120" cy="37" r="12" fill="#7fa7ff" />
      <path d="M114 37h12M120 31v12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      <rect x="30" y="64" width="100" height="8" rx="4" fill="#b9cbef" />
      <rect x="30" y="79" width="84" height="8" rx="4" fill="#c9d7f3" />
    </svg>
  )
}

export const JournalIllustration = () => {
  return (
    <svg viewBox="0 0 160 120" className="feature-illus" role="img" aria-label="Journal illustration">
      <rect x="18" y="12" width="124" height="96" rx="12" fill="#ebf9f3" />
      <rect x="32" y="28" width="74" height="8" rx="4" fill="#1d8264" opacity="0.85" />
      <rect x="32" y="46" width="96" height="6" rx="3" fill="#8eb9ab" />
      <rect x="32" y="60" width="88" height="6" rx="3" fill="#a4cabb" />
      <rect x="32" y="74" width="76" height="6" rx="3" fill="#b5d8ca" />
      <path d="M112 82l20-20 8 8-20 20-12 4z" fill="#2e9b7b" />
    </svg>
  )
}
