import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// import Users from './users'
import LoginPage from './components/LoginPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* <Users /> */}
    <LoginPage />
  </StrictMode>,
)

