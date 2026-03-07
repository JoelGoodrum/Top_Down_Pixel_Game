import './app.css'
import { createGame } from './game/createGame'

declare global {
  interface Window {
    React: {
      createElement: (...args: unknown[]) => unknown
      useEffect: (effect: () => void | (() => void), deps: unknown[]) => void
      useState: <T>(initialValue: T) => [T, (value: T) => void]
      StrictMode: unknown
    }
    ReactDOM: {
      createRoot: (container: Element) => { render: (node: unknown) => void }
    }
  }
}

type Tab = 'game' | 'about'

const stats = {
  websiteVisits: '0',
  totalCompletions: '0',
  averageCompletionTime: '0 minutes',
}

const App = () => {
  const [activeTab, setActiveTab] = window.React.useState<Tab>('game')

  window.React.useEffect(() => {
    if (activeTab !== 'game') {
      return
    }

    const gameRoot = document.getElementById('game-root')
    if (!gameRoot) {
      return
    }

    const game = createGame(gameRoot)
    return () => {
      game.destroy(true)
    }
  }, [activeTab])

  return window.React.createElement(
    'div',
    { className: 'app-shell' },
    window.React.createElement(
      'nav',
      { className: 'navbar', 'aria-label': 'Main navigation' },
      window.React.createElement(
        'button',
        {
          type: 'button',
          className: activeTab === 'game' ? 'nav-link active' : 'nav-link',
          onClick: () => setActiveTab('game'),
        },
        'Game',
      ),
      window.React.createElement('span', { className: 'nav-divider' }, '|'),
      window.React.createElement(
        'button',
        {
          type: 'button',
          className: activeTab === 'about' ? 'nav-link active' : 'nav-link',
          onClick: () => setActiveTab('about'),
        },
        'About',
      ),
    ),
    window.React.createElement(
      'main',
      { className: 'content' },
      activeTab === 'game'
        ? window.React.createElement(
            'section',
            { 'aria-label': 'Game section', className: 'game-section' },
            window.React.createElement('div', { id: 'game-root' }),
          )
        : window.React.createElement(
            'section',
            { 'aria-label': 'About section', className: 'about-section' },
            window.React.createElement(
              'p',
              null,
              'The Person Above is a top down 2d story driven indi game developed by Joel Goodrum. I have developed many game prototypes before but this is my first completed project from start to finish.',
            ),
            window.React.createElement(
              'ul',
              null,
              window.React.createElement('li', null, `Website visits: ${stats.websiteVisits}`),
              window.React.createElement(
                'li',
                null,
                `Total times game has been completed: ${stats.totalCompletions}`,
              ),
              window.React.createElement(
                'li',
                null,
                `Average time to completion: ${stats.averageCompletionTime}`,
              ),
            ),
          ),
    ),
  )
}

const rootElement = document.getElementById('app')

if (!rootElement) {
  throw new Error('Unable to find root element with id "app".')
}

window.ReactDOM.createRoot(rootElement).render(
  window.React.createElement(window.React.StrictMode, null, window.React.createElement(App)),
)
