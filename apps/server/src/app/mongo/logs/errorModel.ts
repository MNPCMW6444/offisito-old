import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { Error } from "@monorepo/types";

export default () => {
  const name = "error";

  const errorModel = new mongoose.Schema(
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

  let errorModelR;
  if (mongoose.models.error) {
    errorModelR = connection.model<Error>(name);
  } else {
    errorModelR = connection.model<Error>(name, errorModel);
  }

  return errorModelR;
};
