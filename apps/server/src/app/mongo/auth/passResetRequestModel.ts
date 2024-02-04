import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { connection } from "../connection";
import { PassResetRequest } from "@monorepo/types";

export default () => {
  const name = "passResetRequest";

  const passResetRequestModel = new mongoose.Schema(
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

  let passResetRequestModelR;
  if (mongoose.models.passResetRequest) {
    passResetRequestModelR = connection.model<PassResetRequest>(name);
  } else {
    passResetRequestModelR = connection.model<PassResetRequest>(
      name,
      passResetRequestModel,
    );
  }

  return passResetRequestModelR; // connection.model("passResetRequest", passResetRequestModel);
};
