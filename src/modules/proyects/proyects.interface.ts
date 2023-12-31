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
  proyectId: ObjectId | null;
  name: string;
  description: string;
  imgUrl?: string;
  createdAt: Date;
  priority: number;
}


export interface addAssetBody {
  name: string;
  description: string;
  imgBase64: string;
  priority: number;
  proyectId: string
}