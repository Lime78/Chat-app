import { ObjectId } from 'mongodb';

export interface User {
    _id: ObjectId;
    password: string;
    isLoggedIn: boolean;
}