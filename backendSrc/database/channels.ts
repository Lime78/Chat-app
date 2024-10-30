import { Db } from 'mongodb';
import { connectToDatabase } from './db.js';
import { Channel } from '../models/channels.js';
async function getAllChannels(): Promise<Channel[]> {
    try {
        const db: Db = await connectToDatabase();
        const channels = await db.collection<Channel>('channelCollection').find({}).toArray();
        return channels;
    } catch (error) {
        console.error('Error fetching channels:', error);
        throw new Error('Could not fetch channels');
    }
}

export { getAllChannels };