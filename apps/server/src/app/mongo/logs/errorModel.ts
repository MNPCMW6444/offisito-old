import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { Error } from "@monorepo/types";

export default () => {
  const name = "error";

  const errorSchema = new mongoose.Schema(
    {
      error: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  let errorModel;
  if (mongoose.models.error) {
    errorModel = connection.model<Error>(name);
  } else {
    errorModel = connection.model<Error>(name, errorSchema);
  }

  return errorModel;
};
