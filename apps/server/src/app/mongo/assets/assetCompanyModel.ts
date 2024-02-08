import { AssetCompanyContract } from "@monorepo/types";
import mongoose, { Types  } from "mongoose";
import { connection } from "../connection";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";


export default () => {
    const name = "assetCompanyContract";

    const  AssetCompanyContractSchema = new mongoose.Schema({
    host:{type: Types.ObjectId , ref: "User", required:true},
    companyName:{type: String,  required:true},
    companyInHold:{type: String,  },
    floorNumber:{type: String,  },
    fullFloor:{type: Boolean,  },
    contractEndDate:{type: Date,  },
    subleasePermission:{type:Boolean,  },
    building: {type: Types.ObjectId, ref: "AssetBuildingModel", },    
})
.plugin(versioning, { collection: name + "s.history", mongoose });



if (!connection) throw new Error("Database not initialized");



let AssetCompanyContractModel;
if (mongoose.models[name]) {
    AssetCompanyContractModel = connection.model<AssetCompanyContract>(name);
} else {
    AssetCompanyContractModel = connection.model<AssetCompanyContract>(name, AssetCompanyContractSchema);

}
return AssetCompanyContractModel

}





