// import { connection } from "../connection";
// import mongoose from "mongoose";
// import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
// import { Asset } from "@monorepo/types";

// export default () => {
//   const name = "asset";

//   const assetModel = new mongoose.Schema(
//     {
//       host: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//       },
//       officeName: {
//         type: String,
//         unique: true,
//       },
//       desc: String,
//       amenities: {
//         freeWiFi: Boolean,
//         Parking: Boolean,
//         lobbySpace: Boolean,
//         computer: Boolean,
//       },
//       companyInHold: String,
//       floor: String,
//       availability: {
//         sun: Boolean,
//         mon: Boolean,
//         tues: Boolean,
//         wed: Boolean,
//         thu: Boolean,
//         fri: Boolean,
//         sat: Boolean,
//       },
//       photoURLs: [String],
//       status: {
//         enum: ["pending", "active", "paused", "archived"],
//         required: true,
//       },
//     },
//     {
//       timestamps: true,
//     },
//   ).plugin(versioning, { collection: name + "s.history", mongoose });

//   if (!connection) throw new Error("Database not initialized");

//   let assetModelR;
//   if (mongoose.models.asset) {
//     assetModelR = connection.model<Asset>(name);
//   } else {
//     assetModelR = connection.model<Asset>(name, assetModel);
//   }

//   return assetModelR; // connection.model("asset", assetModel);
// };


import mongoose, { Schema } from 'mongoose';
import { versioning } from '@mnpcmw6444/mongoose-auto-versioning';
import { Asset } from '@monorepo/types';

const assetSchema = new Schema<Asset>({
  host: { type: Schema.Types.ObjectId, required: true },
  officeName: { type: String, unique: true },
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
  status: { type: String, enum: ['pending', 'active', 'paused', 'archived'], required: true },
  published: {
    type: Boolean,
    default: false
  }
}, {timestamps: true,
},
  
);

assetSchema.plugin(versioning, { collection: 'assets.history', mongoose });

const AssetModel = mongoose.model<Asset>('Asset', assetSchema);

export default AssetModel;