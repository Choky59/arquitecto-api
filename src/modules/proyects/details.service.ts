import db from "../db.module";
import { DetailsSchema } from "./proyects.interface";

class DetailsService {
  private collection = db.Proyects.Details();

  async insertOne(data: DetailsSchema) {
    const res = await this.collection.insertOne(data);
    if(res.acknowledged){
        return true
    } 
    return false
  }
}

export default new DetailsService();
