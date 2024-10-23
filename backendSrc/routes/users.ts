import express, { Request, Response, Router } from 'express';
import { WithId } from 'mongodb';
import { User } from '../models/users';
import { getAllUsers } from '../database/users';


const router: Router = express.Router();

// Route för att hämta alla användare
router.get('/', async (_: Request, res: Response<WithId<User>[]>) => {
    try {
        const allUsers: WithId<User>[] = await getAllUsers();
        res.send(allUsers);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.sendStatus(500);
    }
});

export { router };