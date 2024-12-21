import { Collection, WithId, ObjectId } from 'mongodb'
import { Db } from 'mongodb';
import { connectToDatabase } from './db.js';
import { Channel } from '../models/channels.js';

export const getChannels = async (): Promise<WithId<Channel>[]> => {
  const db: Db = await connectToDatabase();
  console.log('har anslutit till databasen');
  const col: Collection<Channel> = db.collection<Channel>('channels');
  console.log('har anslutit till collection');
  const result: WithId<Channel>[] = await col.find({}).toArray();
  console.log('påväg att skicka result');
  return result;
};

export const getOpenChannels = async (): Promise<WithId<Channel>[]> => {
  const db: Db = await connectToDatabase();
  const col: Collection<Channel> = db.collection<Channel>('channels');
  const result: WithId<Channel>[] = await col.find({ isPrivate: false }).toArray();
  return result;
};

export const getChannelById = async (channelId: ObjectId): Promise<WithId<Channel> | null> => {
  const db: Db = await connectToDatabase();
  const col: Collection<Channel> = db.collection<Channel>('channels');
  const channel = await col.findOne({ _id: channelId });
  return channel;
};

// export { getAllChannels };

// import { Collection, Db, WithId } from 'mongodb'
// import { ObjectId } from 'mongodb'
// import { Channel } from '../models/channels.js'
// import { connectToDatabase } from './db.js'

// export const getChannels = async (): Promise<WithId<Channel>[]> => {
//   const db: Db = await connectToDatabase()
//   const col: Collection<Channel> = db.collection<Channel>('Channels')
//   const result: WithId<Channel>[] = await col.find({}).toArray()
//   return result
// }

// export const getOpenChannels = async (): Promise<WithId<Channel>[]> => {
//   const db: Db = await connectToDatabase()
//   const col: Collection<Channel> = db.collection<Channel>('Channels')
//   const result: WithId<Channel>[] = await col
//     .find({ isPrivate: false })
//     .toArray()
//   return result
// }

// export const getChannelById = async (
//   channelId: ObjectId
// ): Promise<WithId<Channel> | null> => {
//   const db: Db = await connectToDatabase()
//   const col: Collection<Channel> = db.collection<Channel>('Channels')
//   const channel = await col.findOne({ _id: channelId })
//   return channel
// }