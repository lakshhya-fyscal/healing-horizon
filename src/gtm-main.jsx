import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GtmStudio from './GtmStudio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GtmStudio />
  </StrictMode>,
)
