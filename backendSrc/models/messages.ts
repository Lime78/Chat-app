import {  ObjectId } from 'mongodb';


export interface Message {
    _id: ObjectId
    content: string
    senderId: ObjectId
    recipientId?: ObjectId
    channelId?: ObjectId
    isDirectMessage: boolean
  }

  // export interface NewMessage {
  //   content: string
  //   senderId: ObjectId
  //   recipientId?: ObjectId
  //   channelId?: ObjectId
  //   isDirectMessage: boolean
  // }