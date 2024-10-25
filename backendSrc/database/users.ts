import {
    Collection,
    Db,
    WithId,
} from 'mongodb'
import { connectToDatabase } from './db.js'
import { User } from '../models/users.js'

const db: Db = await connectToDatabase()
const col: Collection<User> = db.collection<User>('userInfo')

// Funktion för att hämta alla användare
export const getAllUsers = async (): Promise<WithId<User>[]> => {
    try {
        const users: WithId<User>[] = await col.find({}).toArray();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Could not fetch users');
    }
};