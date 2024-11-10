import { Channel } from './models/channels'; 
import { User } from './models/users'; 
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginLogout from './components/LoginPage';
import ChannelsPage from './components/ChannelsPage';

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

    const fetchChannels = async () => {
        try {
            const response = await fetch('/api/channels');
            if (response.ok) {
                const data = await response.json();
                setChannels(data);
            } else {
                console.error('Failed to fetch channels');
            }
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchUsers();
            fetchChannels();
        }
    }, [isLoggedIn]);

    return (
        <Router>
            <div>
                <Routes>
                    <Route 
                        path="/" 
                        element={isLoggedIn ? <Navigate to="/channels" /> : <LoginLogout setIsLoggedIn={handleLoginStatusChange} fetchChannels={fetchChannels} />} 
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
