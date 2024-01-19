import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { connection } from "../connection";
import { RequestForAccount } from "@monorepo/types";

export default () => {
  const name = "requestForAccount";

  const requestForAccountModel = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  let requestForAccountModelR;
  if (mongoose.models.requestForAccount) {
    requestForAccountModelR = connection.model<RequestForAccount>(name);
  } else {
    requestForAccountModelR = connection.model<RequestForAccount>(
      name,
      requestForAccountModel,
    );
  }

  return requestForAccountModelR; // connection.model("requestForAccount", requestForAccountModel);
};
