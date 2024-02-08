import mongoose from "mongoose";
import createModel from "../createModel";




const AssetsAmenitiesSchema = new mongoose.Schema({
    name:{type:String},
    extraCost:{type:Boolean}

})

 

const BuildingAmenitiesSchema = new mongoose.Schema({
    name:{type:String},
    extraCost:{type:Boolean}

})


const AssetAmenitiesModel = createModel('assetAmenities', AssetsAmenitiesSchema)
const BuildingAmenitiesModel = createModel('buildingAmenities', BuildingAmenitiesSchema)


export {AssetAmenitiesModel, BuildingAmenitiesModel};