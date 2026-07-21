import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import './refinements.css'
import './tech-stack.css'
import './project-reel.css'
import './project-reel-details.css'
import './performance.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { TechStack } from './components/TechStack'
import { initProjectReel } from './projectReel'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
      <TechStack />
    </ErrorBoundary>
  </React.StrictMode>
)

const startEnhancements = () => initProjectReel()

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(startEnhancements, { timeout: 900 })
} else {
  window.setTimeout(startEnhancements, 120)
}