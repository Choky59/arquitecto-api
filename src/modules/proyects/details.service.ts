import { Filter } from "mongodb";
import db from "../db.module";
import { DetailsSchema } from "./proyects.interface";

class DetailsService {
  private collection = db.Proyects.Details();


  async findAll(): Promise<DetailsSchema[]> {
    const res = await this.collection.find({}).toArray();
    return res
  }

  async insertOne(data: DetailsSchema) {
    const res = await this.collection.insertOne(data);
    if(res.acknowledged){
        return true
    } 
    return false
  }

  async deleteOne(filter: Filter<DetailsSchema>) {
    const res = await this.collection.deleteOne(filter);
    if(res.acknowledged){
        return true
    } 
    return false
  }

  async findOne(filter: Filter<DetailsSchema>) {
    const res = await this.collection.findOne(filter);
    return res
  }

  async updateOne(filter: Filter<DetailsSchema>, updateFilter: Filter<DetailsSchema>) {
    const res = await this.collection.updateOne(filter,updateFilter);
    return res
  }
}

export default new DetailsService();
