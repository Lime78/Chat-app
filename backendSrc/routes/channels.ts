import express, { Request, Response } from 'express';
import { WithId } from 'mongodb';
import { getChannels } from '../database/channels.js';
import { Channel } from '../models/channels.js';

const router = express.Router();

// GET /api/channels
router.get('/', async (_: Request, res: Response) => {
    try {
        const channels: WithId<Channel>[] = await getChannels();
        console.log('Channels:', channels);
        res.json(channels);

    } catch (error) {
        console.error('Error getting channels:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export { router };