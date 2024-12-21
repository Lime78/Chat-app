import React, { useEffect } from 'react'
import { useUserStore } from '../../stores/login'
import { useNavigate } from 'react-router-dom'
import { ObjectId } from 'mongodb'

const DirectMessagePage: React.FC = () => {
  const isGuest = useUserStore((state) => state.isGuest)
  const setUsers = useUserStore((state) => state.setUsers)
  const users = useUserStore((state) => state.users)

  const navigate = useNavigate()

  const handleDirectMessage = (userId: ObjectId) => {
    navigate(`/dm-chat/${userId.toString()}`)
  }

  useEffect(() => {
    console.log('UseEffect user:')
    if (!isGuest && users.length === 0) {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch('/api/userInfo', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
          if (!response.ok) {
            throw new Error('Failed to fetch users')
          }
          const data = await response.json()
          setUsers(data)
        } catch (error) {
          console.log('Error is: ', error)
        }
      }
      fetchUserInfo()
    }
  }, [isGuest, setUsers])

  if (isGuest) {
    return null
  }
  console.log('JSX')

  return (
    <div className="dm-container">
      <h3>Direct Messages</h3>
      <ul className="dm-list">
        {users.map((user) => (
          <li
            onClick={() => handleDirectMessage(user._id)}
            key={user._id.toString()}
            className="dm-list-item"
          >
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DirectMessagePage