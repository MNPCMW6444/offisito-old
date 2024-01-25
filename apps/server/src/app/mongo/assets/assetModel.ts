import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { Asset } from "@monorepo/types";

export default () => {
  const name = "asset";

  const assetModel = new mongoose.Schema(
    {
      host: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      officeName: {
        String,
        unique: true,
      },
      desc: String,
      amenities: {
        freeWiFi: Boolean,
        parking: Boolean,
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
      status: {
        enum: ["draft", "pending", "active", "paused", "archived"],
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  let assetModelR;
  if (mongoose.models.asset) {
    assetModelR = connection.model<Asset>(name);
  } else {
    assetModelR = connection.model<Asset>(name, assetModel);
  }

  return assetModelR; // connection.model("asset", assetModel);
};
