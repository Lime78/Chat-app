// import { Collection, Db, WithId, ObjectId } from 'mongodb'
// import { Message } from '../models/messages.js'
// import { connectToDatabase } from './db.js'

// export const getMessages = async (): Promise<WithId<Message>[]> => {
//   const db: Db = await connectToDatabase()
//   const col: Collection<Message> = db.collection<Message>('Messages')
//   const result: WithId<Message>[] = await col.find({}).toArray()
//   return result
// }

// export async function getConversation(
//   user1: ObjectId,
//   user2: ObjectId
// ): Promise<WithId<Message>[]> {
//   const db: Db = await connectToDatabase()
//   const col: Collection<Message> = db.collection<Message>('Messages')
//   console.log(user1, user2)

//   const result: WithId<Message>[] = await col
//     .find({
//       $or: [
//         { senderId: user1, recipientId: user2 },
//         { senderId: user2, recipientId: user1 },
//       ],
//     })
//     .toArray()
//   return result
// }

// export const getChannelConversation = async (
//   channelId: ObjectId
// ): Promise<WithId<Message>[]> => {
//   const db: Db = await connectToDatabase()
//   const col: Collection<Message> = db.collection<Message>('Messages')
//   const result: WithId<Message>[] = await col.find({ channelId }).toArray()
//   return result
// }

import { Collection, Db, WithId, ObjectId, InsertOneResult } from 'mongodb'

import { Message, NewMessage } from '../models/messages.js'
import { connectToDatabase } from './db.js'

export const getMessages = async (): Promise<WithId<Message>[]> => {
  const db: Db = await connectToDatabase()
  const col: Collection<Message> = db.collection<Message>('Messages')
  const result: WithId<Message>[] = await col.find({}).toArray()
  return result
}

export async function getConversation(
  user1: ObjectId,
  user2: ObjectId
): Promise<WithId<Message>[]> {
  const db: Db = await connectToDatabase()
  const col: Collection<Message> = db.collection<Message>('Messages')
  console.log(user1, user2)

  const result: WithId<Message>[] = await col
    .find({
      $or: [
        { senderId: user1, recipientId: user2 },
        { senderId: user2, recipientId: user1 },
      ],
    })
    .toArray()
  return result
}

export const getChannelConversation = async (
  channelId: ObjectId
): Promise<WithId<Message>[]> => {
  const db: Db = await connectToDatabase()
  const col: Collection<Message> = db.collection<Message>('Messages')
  const result: WithId<Message>[] = await col.find({ channelId }).toArray()
  return result
}

export const sendNewMessage = async (
  content: string,
  senderId: ObjectId | 'guest',
  isDirectMessage: boolean,
  recipientId?: ObjectId,
  channelId?: ObjectId
): Promise<ObjectId | null> => {
  try {
    const db: Db = await connectToDatabase()
    const col: Collection<NewMessage> = db.collection('Messages')
    const message = {
      content,
      senderId,
      ...(isDirectMessage && recipientId ? { recipientId } : {}),
      ...(!isDirectMessage && channelId ? { channelId } : {}),
      isDirectMessage,
    }
    const result: InsertOneResult<NewMessage> = await col.insertOne(
      message as Message
    )
    return result.insertedId
  } catch (error) {
    console.error('Error inserting message:', error)
    return null
  }
}