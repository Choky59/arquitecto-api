import { Filter } from "mongodb";
import { MongoOperation } from "../common/interfaces/MongoOperation.interface";
import db from "../db.module";
import { UsersSchema } from "./auth.interface";

class AuthService {
  private collection = db.Authentication.authentication();

  async createUser(data: {
    username: string;
    password: string;
  }): Promise<MongoOperation<UsersSchema>> {
    const createdAt = new Date();
    const result = await this.collection.updateOne(
      { username: data.username },
      {
        $set: { ...data, createdAt: new Date(), type: "admin" },
      },
      { upsert: true }
    );
    if (result.upsertedCount > 0) {
      return {
        data: { ...data, createdAt, type: "admin" },
        status: "success",
        statusCode: 200,
        message: "User created successfully.",
      };
    } else {
      return {
        data: { ...data, createdAt, type: "admin" },
        status: "success",
        statusCode: 200,
        message: "username already exists, replaced with new password.",
      };
    }
  }

  async find(filter: Filter<UsersSchema>): Promise<UsersSchema | null> {
    const user = await this.collection.findOne(filter);
    
    return user;
  }

}

export default new AuthService();
