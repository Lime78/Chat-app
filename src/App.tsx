//orginal

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import LoginLogout from './components/LoginPage';
// import ChannelList from './components/ChannelsPage';
// import { Channel } from './models/channels'; 
// import { User } from './models/users'; 

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 
//     const [channels, setChannels] = useState<Channel[]>([]);
//     const [users, setUsers] = useState<User[]>([]);

//     const handleLoginStatusChange = (status: boolean) => {
//         setIsLoggedIn(status);
//     };

//     // Ny funktion för att hämta användare
//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('/api/users'); 
//             if (response.ok) {
//                 const data = await response.json();
//                 setUsers(data);
//             } else {
//                 console.error('Failed to fetch users');
//             }
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     useEffect(() => {
//         if (isLoggedIn) {
//             fetchUsers(); // Hämta användare när någon är inloggad
//         }
//     }, [isLoggedIn]);

//     return (
//         <Router>
//             <div>
//                 <Routes>
//                     <Route 
//                         path="'/'" 
//                         element={<LoginLogout setIsLoggedIn={handleLoginStatusChange} />} 
//                     />
//                     <Route 
//                         path="channels" 
//                         element={<ChannelList channels={channels} users={users} isLoggedIn={isLoggedIn} isGuest={false} />} 
//                     />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;


// funkar men det blir två olika loggin rutor

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginLogout from './components/LoginPage';
import ChannelsPage from './components/ChannelsPage';
import { Channel } from './models/channels'; 
import { User } from './models/users'; 

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const handleLoginStatusChange = (status: boolean) => {
        setIsLoggedIn(status);
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchUsers();
        }
    }, [isLoggedIn]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route 
                        path="'/'" 
                        element={isLoggedIn ? <Navigate to="/channels" /> : <LoginLogout setIsLoggedIn={handleLoginStatusChange} />} 
                    />
                    <Route 
                        path="/channels" 
                        element={isLoggedIn ? <ChannelsPage channels={channels} users={users} isLoggedIn={isLoggedIn} isGuest={false} /> : <Navigate to="/" />} 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import LoginLogout from './components/LoginPage';
// import ChannelList from './components/ChannelsPage';
// import { Channel } from './models/channels'; 
// import { User } from './models/users'; 

// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 
//     const [channels, setChannels] = useState<Channel[]>([]);
//     const [users, setUsers] = useState<User[]>([]);

//     const handleLoginStatusChange = (status: boolean) => {
//         setIsLoggedIn(status);
//     };

//     // Function to fetch users
//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('/api/users'); 
//             if (response.ok) {
//                 const data = await response.json();
//                 setUsers(data);
//             } else {
//                 console.error('Failed to fetch users');
//             }
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     useEffect(() => {
//         if (isLoggedIn) {
//             fetchUsers();
//         }
//     }, [isLoggedIn]);

//     return (
//         <Router>
//             <div>
//                 <Routes>
//                     <Route 
//                         path="/" 
//                         element={<LoginLogout setIsLoggedIn={handleLoginStatusChange} />} 
//                     />
//                     <Route 
//                         path="channels" 
//                         element={<ChannelList channels={channels} users={users} isLoggedIn={isLoggedIn} isGuest={false} />} 
//                     />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;
