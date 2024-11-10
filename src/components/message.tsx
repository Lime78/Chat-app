// Message.tsx
import React from 'react';
import { Message as MessageType } from '../models/messages';
import './message.css';

interface MessageProps {
    message: MessageType;
    isOwnMessage: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isOwnMessage }) => {
    return (
        <div className={`message ${isOwnMessage ? 'own-message' : ''}`}>
            <div className="message-header">
                <span className="message-username">{message.sender}</span>
                <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="message-content">
                {message.content}
            </div>
        </div>
    );
};

export default Message;
