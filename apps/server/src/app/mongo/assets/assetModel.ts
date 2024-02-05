import { connection } from "../connection";
import mongoose, { Types } from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { Asset, AssetPubStatus, AssetType, LeaseType } from "@monorepo/types";
import { AvailabilitySchema } from "./availabilitySchema";

export default () => {
  const name = "asset";
  const assetSchema = new mongoose.Schema(
    {
      host: { type: Types.ObjectId, ref:"User", required: true },
      assetDescription: { type: String },
      roomNumber: { type: String, required: true },
      assetAvailability: [AvailabilitySchema],
      amenities: [{ type: Types.ObjectId, ref: "AssetAmenities" }],
      photoURLs: [{ type: String }],
      assetType: {
        type: [String],
        enum: Object.values(AssetType),
        required: true,
      },
      publishingStatus: { type: String, enum: Object.values(AssetPubStatus) },
      peopleCapacity: [{ type: Number }],
      leaseCondition: {
        dailyPrice: { type: Number, required: true },
        leaseType: [
          { type: String, enum: Object.values(LeaseType), required: true },
        ],
      },
      leasingCompany: { type: Types.ObjectId, ref: "AssetCompanyContract" },
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + ".history", mongoose });
  console.log("createing ASSET SCHEMA ");
  console.log("conenction", connection);

  if (!connection) throw new Error("Database not initialized");

  let AssetModel;
  if (mongoose.models[name]) {
    AssetModel = connection.model<Asset>(name);
  } else {
    AssetModel = connection.model<Asset>(name, assetSchema);
  }
  return AssetModel;
};
