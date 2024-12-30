import React, { useEffect } from 'react'
import { useUserStore } from '../../stores/login'
import { useNavigate } from 'react-router-dom'
import { ObjectId } from 'mongodb'
import { useChannelStore } from '../../stores/channel'

const ChannelPage: React.FC = () => {
  const setChannels = useChannelStore((state) => state.setChannels)
  const channels = useChannelStore((state) => state.channels)
  const { isGuest } = useUserStore()

  const navigate = useNavigate()

  const handleChannel = (channelId: ObjectId) => {
    navigate(`/channel-chat/${channelId.toString()}`)
  }

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch(
          isGuest ? '/api/channels?guest=true' : '/api/channels',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (!response.ok) {
          throw new Error('Failed to fetch channels')
        }
        const data = await response.json()
        setChannels(data)
      } catch (error) {
        console.log('Error is: ', error)
      }
    }
    fetchChannels()
  }, [])

  return (
    <div className="channel-container">
      <h3> Channels</h3>
      <ul className="channel-list">
        {channels.map((channel) => (
          <li
            onClick={() => handleChannel(channel._id)}
            key={channel._id.toString()}
            className="channel-list-item"
          >
            {channel.name} {channel.isPrivate ? false : true}
            {channel.isPrivate ? '🔒' : '🔓'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChannelPage