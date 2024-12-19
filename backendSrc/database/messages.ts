import { Collection, Db, WithId, ObjectId, InsertOneResult } from 'mongodb'
import { Message } from '../models/messages.js'
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
