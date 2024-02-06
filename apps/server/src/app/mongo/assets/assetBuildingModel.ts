import mongoose, {Types} from "mongoose";
import { connection } from "../connection";
import { AssetBuilding } from "@monorepo/types";
import { AvailabilitySchema } from "./availabilitySchema";


export default () => {
    const name = "assetBuilding";

    // const assetBuilding = AssetBuilding()
const AssetBuildingSchema = new mongoose.Schema({
  buildingName: {type: String, required: true},
  address: {
    street:{type: String, require:true},
    city: {type: String, required:true},
    country: {type: String, required:true},
    geoLocalisation:{
        type:{
            type:String,
            enum: ["Point"],
            required:true
        },
        coordinates:{
            type: [Number],
            required:true,
        }
    }
  },
  buildingAmenities:{type: Types.ObjectId, ref: 'BuildingAmenities'},
  buildingAccess:[AvailabilitySchema],
  buildingDescription:{type:String},
  doorman:{type:Boolean},
  security:{type:Boolean},
  vip_service:{type:Boolean},
  assets:[{type: Types.ObjectId, ref: 'Asset'}],
})

if (!connection)
    throw new Error("Database not initialized");




let AssetBuildingModel;
if (mongoose.models.assetBuilding) {
    AssetBuildingModel = connection.model<AssetBuilding>(name);
} else {
    AssetBuildingModel = connection.model<AssetBuilding>(name, AssetBuildingSchema);
    // AssetBuildingModel.schema.index({ "address.geoLocalisation": "2dsphere" });

}
return AssetBuildingModel


}

