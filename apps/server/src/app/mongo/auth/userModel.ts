import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { User } from "@monorepo/shared";

export default () => {
  const name = "user";
  const userModel = new mongoose.Schema(
    {
      email: {
        type: String,
        unique: true,
      },
      passwordHash: { type: String, required: false },
      name: {
        type: String,
        required: false,
      },
      type: {
        type: String,
        enum: ["admin", "host", "member"],
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  let userModelR;
  if (mongoose.models.user) {
    userModelR = connection.model<User>(name);
  } else {
    userModelR = connection.model<User>(name, userModel);
  }

  return userModelR;
};
