import { Document } from "mongoose";

export interface Error extends Document {
  stringifiedError: string;
}
