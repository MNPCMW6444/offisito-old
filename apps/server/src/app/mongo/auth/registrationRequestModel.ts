import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { connection } from "../connection";
import { RegistrationRequest } from "@monorepo/shared";

export default () => {
  const name = "registrationRequest";

  const registrationRequestModel = new mongoose.Schema(
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

  let registrationRequestModelR;
  if (mongoose.models.registrationRequest) {
    registrationRequestModelR = connection.model<RegistrationRequest>(name);
  } else {
    registrationRequestModelR = connection.model<RegistrationRequest>(
      name,
      registrationRequestModel,
    );
  }

  return registrationRequestModelR; // connection.model("registrationRequest", registrationRequestModel);
};
