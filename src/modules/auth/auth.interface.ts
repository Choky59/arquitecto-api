import { ObjectId } from "mongodb";

export interface UsersSchema {
    _id?: ObjectId;
    username: string;
    password: string;
    createdAt: Date;
    type: 'user' | 'admin';
}

export interface SessionsSchema {
    _id?: ObjectId;
    token: string;
    userId: ObjectId;
    createdAt: Date;
    expiresAt: Date;
}