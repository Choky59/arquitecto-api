import { MongoClient, Collection } from "mongodb";
import { database } from "./config.module";
import { SessionsSchema, UsersSchema } from "./auth/auth.interface";
import { AssetsSchema, DetailsSchema } from "./proyects/proyects.interface";

class Database {
  private mongoClient: MongoClient;
  private MONGO_URI: string;
  constructor() {
    this.MONGO_URI = database.MongoUri();
    this.mongoClient = new MongoClient(this.MONGO_URI);
  }

  async setup() {
    return await this.mongoClient.connect();
  }

  get Authentication() {
    return {
      authentication: (): Collection<UsersSchema> => {
        return this.mongoClient.db("authentication").collection<UsersSchema>("users");
      },
      sessions: (): Collection<SessionsSchema> => {
        return this.mongoClient.db("authentication").collection<SessionsSchema>("sessions");
      },
    };
  }

  get Proyects() {
    return {
      Details: (): Collection<DetailsSchema> => {
        return this.mongoClient.db("proyects").collection<DetailsSchema>("users");
      },
      Assets: (): Collection<AssetsSchema> => {
        return this.mongoClient.db("proyects").collection<AssetsSchema>("assets");
      },
    };
  }
}

export default new Database();
