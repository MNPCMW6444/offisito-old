import mongoose, {Types, Model} from "mongoose";
import { WeekDays } from "@monorepo/types";
import { AssetBuilding } from "@monorepo/types";


const AssetBuildingSchema = new mongoose.Schema({
  buildingName: {type: String, required: true},
  address: {
    street:{type: String, require:true},
    city: {type: String, required:true},
    country: {type: String, required:true},
    geoLocalisation:{
        tyep:{
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
  buildingAccess:[{type:String, enum: Object.values(WeekDays) ,required:true}],
  buildingDescription:{type:String},
  assets:[{type: Types.ObjectId, ref: 'Asset'}],
  companiesRenting:[{type: Types.ObjectId, ref: 'AssetCompanyContract'}],
  
})


const AssetBuildingModel: Model<AssetBuilding> = (() => {
    const existingModel = mongoose.models.AssetBuilding;
    if (existingModel) {
        return existingModel;
    } else {
        const model = mongoose.model<AssetBuilding>('AssetBuilding', AssetBuildingSchema);
        model.schema.index({ geoLocalisation: "2dsphere" });
        return model;
    }
})();

export default AssetBuildingModel