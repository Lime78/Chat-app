import express, { Request, Response } from 'express';
import { WithId } from 'mongodb';
import { getChannels, getOpenChannels } from '../database/channels.js';
import { Channel } from '../models/channels.js';

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

export { router };
// import express, { Request, Response, Router } from 'express'
// import { ObjectId, WithId } from 'mongodb'
// import { Channel } from '../models/channels.js'
// import { getChannels, getOpenChannels } from '../database/channels.js'
// import { getChannelConversation } from '../database/messages.js'
// export const router: Router = express.Router()

// router.get('/', async (req: Request, res: Response<WithId<Channel>[]>) => {
//   const isGuest = req.query.guest === 'true'
//   try {
//     if (isGuest) {
//       const openChannels: WithId<Channel>[] = await getOpenChannels()
//       res.send(openChannels)
//     } else {
//       const allChannels: WithId<Channel>[] = await getChannels()
//       res.send(allChannels)
//     }
//   } catch (error: any) {
//     console.error(error)
//     res.status(500).send(error)
//   }
// })

// router.get('/:channelId/messages', async (req: Request, res: Response) => {
//   try {
//     const channelId = new ObjectId(req.params.channelId)
//     const messages = await getChannelConversation(channelId)
//     const response = messages.map((msg) => ({
//       ...msg,
//       _id: msg._id.toString(),
//       senderId: msg.senderId.toString(),
//       ...(msg.channelId && { channelId: msg.channelId.toString() }),
//       ...(msg.recipientId && { recipientId: msg.recipientId.toString() }),
//     }))
//     console.log('Sended messages data:', response)
//     res.json(response)
//   } catch (error) {
//     console.log('Error fetching channel messages:', error)
//     res
//       .sendStatus(500)
//       .json({ message: 'Failed to fetch messages in channel chat' })
//   }
// })