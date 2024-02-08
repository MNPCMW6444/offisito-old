import { Document } from "mongoose";

export interface Conversation extends Document {
  hostId: string;
  guestId: string;
  name?: string;
  hiddenFor?: string[];
}
