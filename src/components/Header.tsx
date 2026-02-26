import { NavLink } from 'react-router-dom'
import type { ThemeMode } from '../types'

interface HeaderProps {
  theme: ThemeMode
  onToggleTheme: () => void
}

export const Header = ({ theme, onToggleTheme }: HeaderProps) => {
  return (
    <header className="app-header">
      <div>
        <h1>Learning Tracker</h1>
        <p>Stay consistent with focused daily learning.</p>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink to="/progress">Progress</NavLink>
        <NavLink to="/journal">Journal</NavLink>
      </nav>

      <button className="secondary-btn" onClick={onToggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  )
}
