import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/login'

import '../style/login.css'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login, loginAsGuest } = useUserStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok && data.token && data.userId) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('currentUserId', data.userId)
        login(username, data.userId)
        console.log('Login successful')

        navigate('/main')
      } else {
        console.log('Login failed')
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const handleLoginGuest = () => {
    loginAsGuest()
    localStorage.removeItem('currentUserId')
    navigate('/main')
  }

  return (
    <form onSubmit={handleLogin} className="login-container">
      <h2>Chat-app</h2>
      <label className="label-username">
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="label-password">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div className="button-container">
        <button type="submit">Login</button>
        <button
          onClick={handleLoginGuest}
          type="button"
          className="guest-button"
        >
          Continue as guest
        </button>
      </div>
    </form>
  )
}

export default LoginPage