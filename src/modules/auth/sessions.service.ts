import { v4 as uuidv4 } from "uuid";
import db from "../db.module";
import { MongoOperation } from "../common/interfaces/MongoOperation.interface";
import { Filter, ObjectId } from "mongodb";
import { SessionsSchema } from "./auth.interface";

class SessionsService {
  private collection = db.Authentication.sessions();
  async createSession(userId: ObjectId): Promise<MongoOperation<SessionsSchema>> {
    const data = {
      token: uuidv4(),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
      userId,
    };
    const res = await this.collection.insertOne(data);

    if (res.acknowledged == true) {
      return {
        data,
        status: "success",
        statusCode: 200,
      };
    }
    return {
      data,
      status: "error",
      statusCode: 500,
    };
  }

  async findOne(filter: Filter<SessionsSchema>): Promise<SessionsSchema | null> {
    const session = await this.collection.findOne(filter);
    if (!session) {
      return null;
    }
    return session;
  }
}

export default new SessionsService();
