import React from 'react';
import './message.css';

export interface Message {
    _id: ObjectId
    content: string
    senderId: ObjectId
    recipientId?: ObjectId
    channelId?: ObjectId
    isDirectMessage: boolean
  }

export default Message;
