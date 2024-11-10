// // routes.ts
// import { createBrowserRouter, Navigate } from 'react-router-dom';
// import Root from './Root';
// import LoginLogout from '../components/LoginPage';
// import ChannelsPage from '../components/ChannelsPage';

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     children: [
//       { index: true, element: <Navigate to="login" replace /> },
//       { path: 'login', element: <LoginLogout setIsLoggedIn={() => {}} /> },
//       { path: 'channels', element: <ChannelsPage /> },
//     ],
//   },
// ]);
