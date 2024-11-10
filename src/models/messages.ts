import { ObjectId } from 'mongodb';


export interface Message {
    _id: ObjectId;
    channelId: string;
    sender: string;
    content: string;
    timestamp: string;
}
