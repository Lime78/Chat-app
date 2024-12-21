// import React, { useEffect } from 'react'
// import { useUserStore } from '../../stores/login'
// import { useNavigate } from 'react-router-dom'
// import { ObjectId } from 'mongodb'
// import { useChannelStore } from '../../stores/channel'

// interface Channel {
//     _id: ObjectId
//     name: string
//     isPrivate: boolean
// }

// interface ChannelState {
//     name: string
//     channelId: string | null
//     channels: Channel[]
//     setChannels: (channels: Channel[]) => void
//   }

// const ChannelsPage: React.FC<Channel> = ({ users, isLoggedIn,  }) => {
//     const [channels, setChannels] = useState<Channel[]>([]);
//     const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<string | null>(null);

//     const fetchChannels = async () => {
//         setLoading(true);       
//         setError(null);          
        
//         try {
//             const response = await fetch('/api/channels'); 
//             console.log('Response status:', response.status);

//             if (response.ok) {
//                 const data = await response.json();
//                 setChannels(data); 
//             } else {
//                 throw new Error("Failed to fetch channels");
//             }
//         } catch (error) {
//             setError(error instanceof Error ? error.message : 'An error occurred');
//         } finally {
//             setLoading(false);
//         }
//     };
    

//     useEffect(() => {
//         fetchChannels();
//     }, []);

//     return (
//         <div className="channel-layout">
//             <aside className="channel-sidebar">
//                 <h2>Kanaler</h2>
//                 <ul>
//                     {channels.map(channel => (
//                         <li 
//                             key={channel._id.toString()} 
//                             onClick={() => {
//                                 if (isLoggedIn && (!isGuest || !channel.isPrivate)) {
//                                     setSelectedChannel(channel);
//                                 }
//                             }}
//                             className={selectedChannel?._id === channel._id ? 'active' : ''}>
                        
//                             {channel.name} 
//                             {channel.isPrivate ? (isLoggedIn && !isGuest ? '🔓' : '🔒') : '🔓'}
//                         </li>
//                     ))}
//                 </ul>
//             </aside>

//         </div>
//     );
// };

// export default ChannelsPage;

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