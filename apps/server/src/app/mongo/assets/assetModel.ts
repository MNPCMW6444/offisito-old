import { connection } from "../connection";
import mongoose, { Types } from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { AvailabilitySchema } from "./availabilitySchema";
import createModel from "../createModel";
import { Asset, AssetPubStatus, AssetType, LeaseType } from "@monorepo/shared";

export default () => {
  const name = "Asset";

  const assetSchema = new mongoose.Schema(
    {
      assetDescription: { type: String },
      roomNumber: { type: String, required: true },
      assetAvailability: [AvailabilitySchema],
      amenities: [{ type: Types.ObjectId, ref: "assetAmenities" }],
      photoURLs: [{ type: String }],
      assetType: {
        type: [String],
        enum: Object.values(AssetType),
        required: true,
      },
      publishingStatus: { type: String, enum: Object.values(AssetPubStatus) },
      peopleCapacity: [{ type: Number }],
      leaseCondition: {
        dailyPrice: { type: Number },
        leaseType: {
          type: String,
          enum: Object.values(LeaseType),
        },
      },
      leasingCompany: {
        type: Types.ObjectId,
        ref: "companyContract",
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + ".history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  const AssetModel = createModel<Asset>(name, assetSchema);

  return AssetModel;
};
