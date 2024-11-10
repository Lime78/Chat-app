import React, { useState, useEffect } from 'react';
import { Channel } from '../models/channels';
import { User } from '../models/users';
import { Message as MessageType } from '../models/messages';
// import Message from './Message';
import './channel.css';

interface ChannelPageProps {
    channels: Channel[];
    users: User[];
    isLoggedIn: boolean;
    isGuest: boolean;
}

const ChannelsPage: React.FC<ChannelPageProps> = ({ users, isLoggedIn, isGuest }) => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchChannels = async () => {
        setLoading(true);       
        setError(null);          
        
        try {
            const response = await fetch('/api/channels'); 
            if (response.ok) {
                const data = await response.json();
                setChannels(data); 
            } else {
                throw new Error("Failed to fetch channels");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };
    

    const fetchMessages = async (channelId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/messages/${channelId}`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                throw new Error("Failed to fetch messages");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChannels();
    }, []);

    useEffect(() => {
        if (selectedChannel) {
            fetchMessages(selectedChannel._id.toString());
        }
    }, [selectedChannel]);

    const getUsernameById = (id: string) => {
        const user = users.find(user => user._id === id);
        return user ? user.username : "Okänd användare";
    };

    return (
        <div className="channel-layout">
            <aside className="channel-sidebar">
                <h2>Kanaler</h2>
                <ul>
                    {channels.map(channel => (
                        <li 
                            key={channel._id.toString()} 
                            onClick={() => {
                                if (isLoggedIn && (!isGuest || !channel.isLocked)) {
                                    setSelectedChannel(channel);
                                }
                            }}
                            className={selectedChannel?._id === channel._id ? 'active' : ''}
                        >
                            {channel.name} 
                            {channel.isLocked ? (isLoggedIn && !isGuest ? '🔓' : '🔒') : '🔓'}
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="messages-list">
                {loading && <p>Loading messages...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {selectedChannel ? (
                    <>
                        <h2>Meddelanden i {selectedChannel.name}</h2>
                        <ul>
                                {messages.length > 0 ? (
                                    messages.map((message) => (
                                        <li className="msg-card" key={message._id}>
    										<div className="msg-header">
        										<strong>{getUsernameById(message.sender)}</strong>
        										<em>{new Date(message.timestamp).toLocaleString()}</em>
    										</div>
    										<div className="msg-content">
       											 {message.content}
    										</div>
										</li>
                                    ))
                                ) : (
                                    <li>Det finns inga meddelanden att visa för denna kanal.</li>
                                )}
                            </ul>
                    </>
                ) : (
                    <p>Select a channel to view messages</p>
                )}
            </main>
        </div>
    );
};

export default ChannelsPage;

