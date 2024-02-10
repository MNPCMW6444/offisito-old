import mongoose from "mongoose";
import createModel from "../createModel";
import { AssetsAmenities } from "@monorepo/shared";

const AssetsAmenitiesSchema = new mongoose.Schema({
  name: { type: String },
  extraCost: { type: Boolean },
});

const BuildingAmenitiesSchema = new mongoose.Schema({
  name: { type: String },
  extraCost: { type: Boolean },
});

const AssetAmenitiesModel = createModel<AssetsAmenities>(
  "assetAmenities",
  AssetsAmenitiesSchema,
);
const BuildingAmenitiesModel = createModel(
  "buildingAmenities",
  BuildingAmenitiesSchema,
);

export { AssetAmenitiesModel, BuildingAmenitiesModel };
