import { AssetCompanyContract } from "@monorepo/types";
import mongoose, { Types  } from "mongoose";
import { connection } from "../connection";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";


export default () => {
    const name = "AssetCompanyContract";

    const  AssetCompanyContractSchema = new mongoose.Schema({
    host:{type: Types.ObjectId , ref: "User", required:true},
    companyName:{type: String,  required:true},
    companyInHold:{type: String,  required:true},
    floorNumber:{type: Number,  required:true},
    fullFloor:{type: Boolean,  required:true},
    contractEndDate:{type: Date,  required:true},
    subleasePermission:{type:Boolean,  required:true},
    building: {type: Types.ObjectId, ref: "AssetBuilding", required:true},
    assets: {type: Types.ObjectId, ref:"Asset" },
    
})
.plugin(versioning, { collection: 'AssetCompanyContract' + "s.history", mongoose });



if (!connection) throw new Error("Database not initialized");



let AssetCompanyContractModel;
if (mongoose.models.asset) {
    AssetCompanyContractModel = connection.model<AssetCompanyContract>(name);
} else {
    AssetCompanyContractModel = connection.model<AssetCompanyContract>(name, AssetCompanyContractSchema);

}
return AssetCompanyContractModel

}





