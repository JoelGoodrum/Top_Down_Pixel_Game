import './app.css'
import { React, useEffect, useState } from './react'
import { createGame } from './game/createGame'
import { AboutSection } from './components/AboutSection'
import { GameSection } from './components/GameSection'
import { Navigation } from './components/Navigation'
import { resetPersistentPlayerState } from './scenes/GameScene'

type Tab = 'game' | 'about'

const App = () => {
  const [activeTab, setActiveTab] = useState<Tab>('game')

  useEffect(() => {
    if (activeTab !== 'game') {
      return
    }

    const gameRoot = document.getElementById('game-root')
    if (!gameRoot) {
      return
    }

    resetPersistentPlayerState()
    const game = createGame(gameRoot)

    return () => {
      game.destroy(true)
    }
  }, [activeTab])

  return (
    <div className="app-shell">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="content">{activeTab === 'game' ? <GameSection /> : <AboutSection />}</main>
    </div>
  )
}

const rootElement = document.getElementById('app')

if (!rootElement) {
  throw new Error('Unable to find root element with id "app".')
}

window.ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
