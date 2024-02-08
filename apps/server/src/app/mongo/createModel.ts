import mongoose from "mongoose";
import { Document, Schema, Model } from "mongoose";





export default function createModel<T extends Document>(
    collectionName: string,
    schema: mongoose.Schema
  ): Model<T> {
    if (mongoose.models[collectionName]) {
      return mongoose.models[collectionName] as Model<T>;
    } else {
    
      
      return mongoose.model<T>(collectionName, schema);
    }
  }