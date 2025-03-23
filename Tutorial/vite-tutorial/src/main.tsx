import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './assets/css/index.css'
import './assets/css/App.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

createRoot(document.getElementById('header')!).render(
  <>
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  </>
)
