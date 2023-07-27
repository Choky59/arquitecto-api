import { Filter, InsertOneResult, UpdateFilter } from "mongodb";
import db from "../db.module";
import { AssetsSchema } from "./proyects.interface";
import { MongoOperation } from "../common/interfaces/MongoOperation.interface";

class AssetsService {
  private collection = db.Proyects.Assets();



  async find(filter: Filter<AssetsSchema>): Promise<AssetsSchema[]> {
    const res = await this.collection.find(filter).toArray();
    return res
  }


  async findAll(): Promise<AssetsSchema[]> {
    const res = await this.collection.find({}).toArray();
    return res;
  }

  async insertOne(data: AssetsSchema): Promise<MongoOperation<InsertOneResult<AssetsSchema>>> {
    const res = await this.collection.insertOne(data);
    if (res.acknowledged) {
      return {
        data: res,
        status: "success",
        statusCode: 200,
        message: "Insertion succedded",
      };
    }
    return {
      data: res,
      status: "error",
      statusCode: 501,
      errorMessage: "Unable to insert data",
    };
  }

  async deleteOne(filter: Filter<AssetsSchema>) {
    const res = await this.collection.deleteOne(filter);
    if (res.acknowledged) {
      return true;
    }
    return false;
  }

  async findOne(filter: Filter<AssetsSchema>) {
    const res = await this.collection.findOne(filter);
    return res;
  }

  async updateOne(filter: Filter<AssetsSchema>, newData: UpdateFilter<AssetsSchema>) {
    const res = await this.collection.updateOne(filter, newData);
    return res;
  }
}

export default new AssetsService();
