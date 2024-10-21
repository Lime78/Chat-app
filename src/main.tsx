import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Users from './users'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Users />
  </StrictMode>,
)

