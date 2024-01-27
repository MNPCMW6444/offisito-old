import { Schema } from "mongoose";

export interface Error extends Schema {
  stringifiedError: string;
}
