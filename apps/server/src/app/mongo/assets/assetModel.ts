import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
// import { Asset } from "@monorepo/types";
import { Asset } from "@monorepo/types"




export default () => {
  const name = "asset";

  const assetModel = new mongoose.Schema(
    {
      host: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      officeName: {
        type: String,
        unique: true,
      },
      desc: String,
      
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
        type: String,
        enum: ["draft", "pending", "active", "paused", "archived"],
        required: false,
      },
      location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GeoJSONPoint', 
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
