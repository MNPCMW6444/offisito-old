import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";

export default () => {
  const name = "asset";

  const assetModel = new mongoose.Schema(
    {
      host: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      officeName: String,
      desc: String,
      amenities: {
        freeWiFi: Boolean,
        Parking: Boolean,
        lobbySpace: Boolean,
        computer: Boolean,
      },
      companyInHold: String,
      floor: String,
      availability: {
        sun: Boolean,
        mon: Boolean,
        tues: Boolean,
        wed: Boolean,
        thu: Boolean,
        fri: Boolean,
        sat: Boolean,
      },
      photoURLs: [String],
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  let assetModelR;
  if (mongoose.models.asset) {
    assetModelR = connection.model(name);
  } else {
    assetModelR = connection.model(name, assetModel);
  }

  return assetModelR; // connection.model("asset", assetModel);
};
