import { createBrowserRouter, Navigate } from 'react-router-dom'
import Root from './Root'
import LoginPage from '../components/LoginPage'
import Main from '../components/Main'
import DirectMessagePage from '../components/DM/DirectMessagePage'
import ChannelPage from '../components/Channels/ChannelsPage'
import DirectMessageChat from '../components/DM/DIrectMessageChat'
import ChannelsChat from '../components/Channels/ChannelsChat'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'dm',
        element: <DirectMessagePage />,
      },
      {
        path: 'channel',
        element: <ChannelPage />,
      },
      {
        path: 'channel-chat/:channelId',
        element: <ChannelsChat />,
      },
      {
        path: 'dm-chat/:userId',
        element: <DirectMessageChat />,
      },
    ],
  },
])