import mongoose, { Types } from "mongoose";
import { connection } from "../connection";
import { Building } from "@monorepo/shared";
import { AvailabilitySchema } from "./availabilitySchema";
import createModel from "../createModel";

export default () => {
  const name = "Building";

  const AssetBuildingSchema = new mongoose.Schema({
    buildingName: { type: String, required: true },
    address: {
      street: { type: String, require: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      geoLocalisation: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
    },
    buildingAmenities: { type: Types.ObjectId, ref: "buildingAmenities" },
    buildingAccess: [AvailabilitySchema],
    buildingDescription: { type: String },
    doorman: { type: Boolean },
    security: { type: Boolean },
    vip_service: { type: Boolean },
    assets: [{ type: Types.ObjectId, ref: "asset" }],
  });

  if (!connection) throw new Error("Database not initialized");

  const AssetBuildingModel = createModel<Building>(name, AssetBuildingSchema);

  return AssetBuildingModel;
  //  export default AssetBuildingModel;
  //
};
