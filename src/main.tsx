// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App'
// import LoginPage from './components/LoginPage'
// import ChannelsPage from './components/ChannelsPage'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//     <ChannelsPage />
//     <LoginPage />
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);