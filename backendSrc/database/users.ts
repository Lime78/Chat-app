import {
    Collection,
    Db,
    WithId,
    ObjectId,
} from 'mongodb'
import { connectToDatabase } from './db'
import { User } from '../models/users'

const db: Db = await connectToDatabase()
const col: Collection<User> = db.collection<User>('användare')

// Funktion för att hämta alla användare
export const getAllUsers = async (): Promise<WithId<User>[]> => {
    try {
        // Hämta alla användare från kollektionen
        const users: WithId<User>[] = await col.find().toArray();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Could not fetch users');
    }
};