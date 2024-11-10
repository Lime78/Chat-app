
import React, { useState, useEffect } from 'react';
import { Channel } from '../models/channels';
import { Users } from '../models/users';
import ChannelPage from './ChannelsPage';
import './login.css';

const LS_KEY = 'JWT-DEMO--TOKEN';
const USERNAME_KEY = 'USERNAME';



const LoginLogout = ({ setIsLoggedIn }: { setIsLoggedIn: (status: boolean) => void }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [isGuest, setIsGuest] = useState<boolean>(false);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem(LS_KEY);
        const storedUsername = localStorage.getItem(USERNAME_KEY);
        if (token) {
            setLoggedIn(true);
            setIsGuest(token === 'guest');
            setUsername(storedUsername || '');
            fetchChannels();
        }
    }, []);

    const fetchChannels = async () => {
        const token = localStorage.getItem(LS_KEY);
        if (!token) return;

        try {
            const response = await fetch('/api/channels', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data: Channel[] = await response.json();
                setChannels(data);
                setError(null);
            } else {
                throw new Error("Failed to fetch channels");
            }
        } catch (err) {
            setError("Could not fetch channels");
        }
    };

    // Handle standard login
    const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const { jwt } = await response.json();
                localStorage.setItem(LS_KEY, jwt);
                localStorage.setItem(USERNAME_KEY, username);
                setLoggedIn(true);
                setIsGuest(false);
                setSuccessMessage(`Welcome, ${username}!`);
                fetchChannels();
                setIsLoggedIn(true);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }
        } catch {
            setError('Login failed');
        }
    };

    const handleLoginAsGuest = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.setItem(LS_KEY, 'guest');
        localStorage.setItem(USERNAME_KEY, 'Guest');
        setLoggedIn(true);
        setIsGuest(true);
        setUsername('Guest');
        fetchChannels();
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem(LS_KEY);
        localStorage.removeItem(USERNAME_KEY);
        setLoggedIn(false);
        setIsGuest(false);
        setChannels([]);
        setSuccessMessage(null);
        setIsLoggedIn(false);
    };

    return (
        <div>
            <main className={isLoggedIn ? 'logged-in' : 'logged-out'}>
                <h1 className="logo">ChatApp!</h1>
                {isLoggedIn ? (
                    <div className="logged-in-div">
                        <p><strong>{username}</strong></p>
                        <button id="logout-button" onClick={handleLogout}>Log out</button>
                    </div>
                ) : (
                    <div className="login-form">
                        <input
                            className="login-input"
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            className="login-input"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <button id="login-button" onClick={handleLogin} disabled={isLoggedIn}>Log in</button>
                        <button id="guest-login-button" onClick={handleLoginAsGuest}>Log in as guest</button>
                    </div>
                )}
            </main>

            <div className="channels-result">
                {successMessage && <p>{successMessage}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {isLoggedIn && channels.length > 0 && (
                    <ChannelPage channels={channels} isLoggedIn={isLoggedIn} isGuest={isGuest} />
                )}
            </div>
        </div>
    );
};

export default LoginLogout;

// import React, { useState, useEffect } from 'react';
// import { User } from '../models/users';
// import { Channel } from '../models/channels';
// import ChannelPage from './ChannelsPage';
// import './login.css';

// const LS_KEY = 'JWT-DEMO--TOKEN';
// const USERNAME_KEY = 'USERNAME';

// const LoginLogout = ({ setIsLoggedIn, fetchChannels }: { setIsLoggedIn: (status: boolean) => void, fetchChannels: () => void }) => {
//     const [username, setUsername] = useState<string>('');
//     const [password, setPassword] = useState<string>('');
//     const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
//     const [isGuest, setIsGuest] = useState<boolean>(false);
//     const [channels, setChannels] = useState<Channel[]>([]);
//     const [users, setUsers] = useState<User[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [successMessage, setSuccessMessage] = useState<string | null>(null);

//     useEffect(() => {
//         const token = localStorage.getItem(LS_KEY);
//         const storedUsername = localStorage.getItem(USERNAME_KEY);
//         if (token) {
//             setLoggedIn(true);
//             setIsGuest(token === 'guest');
//             setUsername(storedUsername || '');
//             fetchChannels();
//             fetchUsers();
//         }
//     }, [fetchChannels]);

//     const fetchChannels = async () => {
//         const token = localStorage.getItem(LS_KEY);
//         if (!token) return;

//         try {
//             const response = await fetch('/api/channels', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (response.ok) {
//                 const data: Channel[] = await response.json();
//                 setChannels(data);
//                 setError(null);
//             } else {
//                 throw new Error("Failed to fetch channels");
//             }
//         } catch (err) {
//             setError("Could not fetch channels");
//         }
//     };

//     const fetchUsers = async () => {
//         const token = localStorage.getItem(LS_KEY);
//         if (!token) return;

//         try {
//             const response = await fetch('/api/users', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (response.ok) {
//                 const data: User[] = await response.json();
//                 setUsers(data);
//                 setError(null);
//             } else {
//                 throw new Error("Failed to fetch users");
//             }
//         } catch (err) {
//             setError("Could not fetch users");
//         }
//     };

//     const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         setError(null);

//         const data = { username, password };
//         const response = await fetch('/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });

//         if (response.status !== 200) {
//             const errorData = await response.json();
//             setError(errorData.message || 'Please log in again.');
//             return;
//         }

//         const token: { jwt: string } = await response.json();
//         localStorage.setItem(LS_KEY, token.jwt);
//         localStorage.setItem(USERNAME_KEY, username);
//         setLoggedIn(true);
//         setIsGuest(false);
//         setSuccessMessage(`Välkommen ${username}!`);
//         setError(null);
//         setIsLoggedIn(true); // Ensure this is called after successful login
//         fetchChannels(); // Fetch channels after login
//         fetchUsers(); // Fetch users after login
//     };

//     const handleLoginAsGuest = (e: React.FormEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         localStorage.setItem(LS_KEY, 'guest');
//         localStorage.setItem(USERNAME_KEY, 'Guest');
//         setLoggedIn(true);
//         setIsGuest(true);
//         setUsername('Guest');
//         setIsLoggedIn(true); // Ensure this is called after successful guest login
//         fetchChannels(); // Fetch channels after guest login
//         fetchUsers(); // Fetch users after guest login
//     };

//     const handleLogout = () => {
//         localStorage.removeItem(LS_KEY);
//         localStorage.removeItem(USERNAME_KEY);
//         setLoggedIn(false);
//         setIsGuest(false);
//         setIsLoggedIn(false); // Ensure this is called to update the parent component
//     };

//     return (
//         <div>
//             <main className="logged-out">
//                 <h1 className="logo">ChatApp!</h1>
//                 <div className="login-form">
//                     <input
//                         className="login-input"
//                         id="username"
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         placeholder="Username"
//                     />
//                     <input
//                         className="login-input"
//                         id="password"
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Password"
//                     />
//                     <button id="login-button" onClick={handleLogin} disabled={isLoggedIn}>Logga in</button>
//                     <button id="guest-login-button" onClick={handleLoginAsGuest}>Logga in som gäst</button>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default LoginLogout;