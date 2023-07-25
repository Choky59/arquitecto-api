import { ObjectId } from "mongodb";

export interface DetailsSchema {
  _id?: ObjectId;
  name: string;
  description: string;
  imgUrl?: string;
  createdAt: Date;
  priority: number;
}

export interface AssetsSchema {
  _id?: ObjectId;
  proyect: ObjectId | null;
  name: string;
  description: string;
  imgUrl: string;
  createdAt: Date;
  priority: number;
}
