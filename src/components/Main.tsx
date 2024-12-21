import React from 'react'
import { useNavigate } from 'react-router-dom'
import DirectMessagePage from './DM/DirectMessagePage'
import ChannelPage from './Channels/ChannelsPage'
import '../style/main.css'
import { useUserStore } from '../stores/login'

const Main: React.FC = () => {
  const { username, logout, isGuest } = useUserStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    logout()
    navigate('/login')
  }

  return (
    <div>
      <div className="main-page-container">
        <main className="main-container">
          <header className="header-container">
            <h2>Kanaler</h2>
            <div className="profile-container">
              <div className="profile-name">{isGuest ? 'Guest' : username}</div>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </header>
          <div className="main-content">
            <DirectMessagePage />
            <ChannelPage />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Main