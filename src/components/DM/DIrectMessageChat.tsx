import React, { FormEvent, useEffect, useState } from 'react';
import '../../style/channel.css';
import { useParams } from 'react-router-dom';
import { Message } from '../../stores/messages';
import { useUserStore } from '../../stores/login';
import { useMessageStore } from '../../stores/messages';
import { useNavigate } from 'react-router-dom';

const DirectMessageChat: React.FC = () => {
  const [newMessage, setNewMessage] = useState('');
  const { userId } = useParams<{ userId: string }>();
  const currentUserId = localStorage.getItem('currentUserId') || 'guest';
  const users = useUserStore((state) => state.users);
  const isGuest = useUserStore((state) => state.isGuest);
  const setUsers = useUserStore((state) => state.setUsers);
  const addMessage = useMessageStore((state) => state.addMessage);
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);

  const userMap = users.reduce((map: { [key: string]: string }, user) => {
    map[user._id.toString()] = user.username;
    return map;
  }, {});

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const recipientName = userId ? userMap[userId] : 'Unknown User';

  useEffect(() => {
    const fetchDirectMessages = async () => {
      try {
        const response = await fetch(`/api/messages/contacts?otherUserId=${userId}`, {
          headers: isGuest
            ? {}
            : {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch direct messages');
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error fetching direct messages:', error);
      }
    };
    fetchDirectMessages();
  }, [userId, currentUserId, isGuest, setMessages]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/userInfo', {
          headers: isGuest
            ? {}
            : {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [isGuest, setUsers]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      content: newMessage,
      senderId: currentUserId,
      recipientId: userId || '',
      isDirectMessage: true,
    };

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const { messageId } = await response.json();
      const message: Message = { _id: messageId, ...messageData };
      addMessage(message);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="channel-chat-container">
      <header className="channel-chat-header">
        <button onClick={handleBack} className="back-button">
          ← Back
        </button>
        <h2 className="channel-chat-header-rubric">
          Direct Messages with {recipientName}
        </h2>
      </header>

      <main className="channel-chat-main">
        <ul className="channel-chat-conversation">
          {messages
            .filter((message) => message.isDirectMessage && (message.senderId === currentUserId || message.recipientId === currentUserId))
            .map((message) => (
              <li
                key={message._id}
                className={`channel-chat-message-container ${
                  message.senderId === currentUserId ? 'sent' : 'received'
                }`}
              >
                <h3 className="channel-chat-message-username">
                  {userMap[message.senderId] ||
                    (message.senderId === 'guest' ? 'Guest' : 'Unknown User')}
                </h3>
                <p className="channel-chat-message">{message.content}</p>
              </li>
            ))}
        </ul>
      </main>

      <form
        className="channel-chat-input-container"
        onSubmit={handleSendMessage}
      >
        <div className="input-wrapper">
          <input
            className="channel-chat-input"
            type="text"
            value={newMessage}
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default DirectMessageChat;