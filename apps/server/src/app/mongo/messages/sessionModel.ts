import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";

export default () => {
  const name = "conversation";

  const conversationModel = new mongoose.Schema(
    {
      pairId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      hiddenFor: { type: String },
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  let conversationModelR;
  if (mongoose.models[name]) {
    conversationModelR = connection.model(name);
  } else {
    conversationModelR = connection.model(name, conversationModel);
  }

  return conversationModelR; // connection.model("conversation", conversationModel);
};
