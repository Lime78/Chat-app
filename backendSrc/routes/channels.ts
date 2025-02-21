import express, { Request, Response } from 'express';
import { ObjectId, WithId } from 'mongodb';
import { getChannels, getOpenChannels } from '../database/channels.js';
import { Channel } from '../models/channels.js';
import { connectToDatabase } from '../database/db.js';
import { Message } from '../models/messages.js';

const router = express.Router();

// GET /api/channels
router.get('/', async (req: Request, res: Response) => {
    const isGuest = req.query.guest === 'true';
    try {
        const channels: WithId<Channel>[] = isGuest ? await getOpenChannels() : await getChannels();
        console.log('Channels:', channels);
        res.json(channels);
    } catch (error) {
        console.error('Error getting channels:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:channelId/messages', async (req: Request, res: Response) => {
  const { channelId } = req.params;

  try {
    const db = await connectToDatabase();
    const messagesCollection = db.collection<Message>('messages');
    const messages = await messagesCollection.find({ channelId: new ObjectId(channelId) }).toArray();
    res.json(messages);
  } catch (error) {
    console.error("Error fetching channel messages:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export { router };
