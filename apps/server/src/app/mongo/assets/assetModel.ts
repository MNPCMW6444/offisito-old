import { connection } from "../connection";
import mongoose from "mongoose";
import { Types } from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { Asset, WeekDays, AssetPubStatus, AssetType, LeaseType } from "@monorepo/types";





  export  const assetScema = new mongoose.Schema(
    {
      roomNumber:{type:String , required: true},
      assetDescription: {type:String},
      availability:{type:String, enum:Object.values(WeekDays), required: true},
      amenities:[{type: Types.ObjectId, ref: 'AssetsAmenities'}],
      photoURLs:[{type: String}],
      assetType:{type:[String], enum:Object.values(AssetType), required:true},
      publishingStatus:{type:String, enum: Object.values(AssetPubStatus)},
      peopleCapcity:[{type:Number}],
      leaseCondition:{
        dailyPrice:{type:Number, required:true},
        leaseType: [{type: String, enum: Object.values(LeaseType), required:true}]
      },
      leasingCompany: {type: Types.ObjectId, ref:'CompanyContract'},
      building: {type: Types.ObjectId, ref: 'AssetBuilding'}
    },
    {
      timestamps: true,
    },
  )
  .plugin(versioning, { collection: 'Asset' + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  let AssetModel;
  if (mongoose.models.asset) {
    AssetModel = connection.model<Asset>('Asset');
  } else {
    AssetModel = connection.model<Asset>('Asset', assetScema);

  }
  export default AssetModel


