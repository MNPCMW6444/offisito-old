import mongoose from "mongoose";
import { AssetsAmenities, BuildingAmenities } from "@monorepo/types";

const AssetsAmenitiesSchema = new mongoose.Schema({
    name:{type:String},
    extraCost:{type:Boolean}

})


 

const BuildingAmenitiesSchema = new mongoose.Schema({
    name:{type:String},
    extraCost:{type:Boolean}

})


export const AssetAmenitiesModel = mongoose.model<AssetsAmenities>('AssetAmenities', AssetsAmenitiesSchema)
export const BuildingAmenitiesModel = mongoose.model<BuildingAmenities>('BuildingAmenities', BuildingAmenitiesSchema)
