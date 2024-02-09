import { Document } from "mongoose";

export interface Conversation extends Document {
  hostId: string;
  memberId: string;
  hiddenFor?: string[];
}

export interface Message extends Document {
  ownerId: string;
  conversationId: string;
  message: string;
  whenQueried?: number;
  whenMarked?: number;
}
