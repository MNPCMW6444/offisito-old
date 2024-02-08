import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";

export default () => {
  const name = "message";

  const messageModel = new mongoose.Schema(
    {
      ownerId: {
        type: String,
        required: true,
      },
      conversationId: { type: String, required: true },
      message: {
        type: String,
        required: true,
      },
      whenQueried: Number,
      whenMarked: Number,
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  let messageModelR;
  if (mongoose.models[name]) {
    messageModelR = connection.model(name);
  } else {
    messageModelR = connection.model(name, messageModel);
  }

  return messageModelR; // connection.model("message", messageModel);
};