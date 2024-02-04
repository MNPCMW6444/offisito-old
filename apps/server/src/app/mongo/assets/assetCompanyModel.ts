import { AssetCompanyContract } from "@monorepo/types";
import mongoose, { Types, Model  } from "mongoose";
import { connection } from "../connection";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";



const AssetCompanyContractSchema = new mongoose.Schema({
    host:{type: Types.ObjectId , ref: "User", required:true},
    companyName:{type: String,  required:true},
    companyInHold:{type: String,  required:true},
    floorNumber:{type: Number,  required:true},
    fullFloor:{type: Boolean,  required:true},
    contractEndDate:{type: Date,  required:true},
    subleasePermission:{type:Boolean,  required:true},
    building: {type: Types.ObjectId, ref: "AssetBuilding", required:true},
    assets: {type: Types.ObjectId, ref:"Asset" }
})
.plugin(versioning, { collection: 'assetCompanyContract' + "s.history", mongoose });



if (!connection) throw new Error("Database not initialized");


const AssetCompanyContractModel: Model<AssetCompanyContract> = (() => {
    const existingModel = mongoose.models.assetCompanyContract;
    if (existingModel) {
      return existingModel;
    } else {
        const model = mongoose.model<AssetCompanyContract>('assetCompanyContract', AssetCompanyContractSchema);
        return model;
    }
  })();
  
export default AssetCompanyContractModel;




