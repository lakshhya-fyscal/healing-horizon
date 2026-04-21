import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FyscalWebsite from './FyscalWebsite.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FyscalWebsite />
  </StrictMode>,
)
