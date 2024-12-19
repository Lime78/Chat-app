import React, { useState, useEffect } from 'react';
import { Channel } from '../models/channels';
import { User } from '../models/users';
import { Message as MessageType } from '../models/messages';
import Message from './message.js';
import './channel.css';

interface ChannelPageProps {
    channels: Channel[];
    users?: User[];
    isLoggedIn: boolean;
    isGuest: boolean;
}

const ChannelsPage: React.FC<ChannelPageProps> = ({ users, isLoggedIn, isGuest }) => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchChannels = async () => {
        setLoading(true);       
        setError(null);          
        
        try {
            const response = await fetch('/api/channels'); 
            console.log('Response status:', response.status);

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
    

    useEffect(() => {
        fetchChannels();
    }, []);

    return (
        <div className="channel-layout">
            <aside className="channel-sidebar">
                <h2>Kanaler</h2>
                <ul>
                    {channels.map(channel => (
                        <li 
                            key={channel._id.toString()} 
                            onClick={() => {
                                if (isLoggedIn && (!isGuest || !channel.isPrivate)) {
                                    setSelectedChannel(channel);
                                }
                            }}
                            className={selectedChannel?._id === channel._id ? 'active' : ''}>
                        
                            {channel.name} 
                            {channel.isPrivate ? (isLoggedIn && !isGuest ? '🔓' : '🔒') : '🔓'}
                        </li>
                    ))}
                </ul>
            </aside>

        </div>
    );
};

export default ChannelsPage;

