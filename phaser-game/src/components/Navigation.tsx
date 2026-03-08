import { React } from '../react'

type Tab = 'game' | 'about'

type NavigationProps = {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

export const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <button
        type="button"
        className={activeTab === 'game' ? 'nav-link active' : 'nav-link'}
        onClick={() => setActiveTab('game')}
      >
        Game
      </button>
      <span className="nav-divider">|</span>
      <button
        type="button"
        className={activeTab === 'about' ? 'nav-link active' : 'nav-link'}
        onClick={() => setActiveTab('about')}
      >
        About
      </button>
    </nav>
  )
}
