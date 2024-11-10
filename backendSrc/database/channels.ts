import { Collection, WithId, ObjectId } from 'mongodb'
import { Db } from 'mongodb';
import { connectToDatabase } from './db.js';
import { Channel } from '../models/channels.js';

export const getChannels = async (): Promise<WithId<Channel>[]> => {
  const db: Db = await connectToDatabase();
  const col: Collection<Channel> = db.collection<Channel>('Channels');
  const result: WithId<Channel>[] = await col.find({}).toArray();
  return result;
};

export const getOpenChannels = async (): Promise<WithId<Channel>[]> => {
  const db: Db = await connectToDatabase();
  const col: Collection<Channel> = db.collection<Channel>('Channels');
  const result: WithId<Channel>[] = await col.find({ isPrivate: false }).toArray();
  return result;
};

export const getChannelById = async (channelId: ObjectId): Promise<WithId<Channel> | null> => {
  const db: Db = await connectToDatabase();
  const col: Collection<Channel> = db.collection<Channel>('Channels');
  const channel = await col.findOne({ _id: channelId });
  return channel;
};

// export { getAllChannels };