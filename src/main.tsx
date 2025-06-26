import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Routing from './routes/Routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routing />
  </StrictMode>,
)
