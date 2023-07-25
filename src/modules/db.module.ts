import { MongoClient, Collection } from 'mongodb'
import { database } from './config.module'
import { SessionsSchema, UsersSchema } from './auth/auth.interface'

class Database {
    private mongoClient: MongoClient
    private MONGO_URI: string
    constructor() {
        this.MONGO_URI = database.MongoUri()
        this.mongoClient = new MongoClient(this.MONGO_URI)
    }

    async setup() {
        return await this.mongoClient.connect()
        
    }

    get Authentication() {
        return {
            authentication: (): Collection<UsersSchema> => {
                return this.mongoClient
                    .db('authentication')
                    .collection<UsersSchema>('users')
            },
            sessions: (): Collection<SessionsSchema> => {
                return this.mongoClient
                    .db('authentication')
                    .collection<SessionsSchema>('sessions')
            },
        }
    }
}

export default new Database()
