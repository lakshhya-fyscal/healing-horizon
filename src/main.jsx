import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Workshops from './Workshops.jsx'

const Page = window.location.pathname.replace(/\/$/, '') === '/workshops' ? Workshops : App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page />
  </StrictMode>,
)
