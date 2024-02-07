import { ObjectId, Types } from "mongoose";
import { AssetPubStatus, Availability, LeaseType } from "../../../mongo";


export interface CreateEditAssetReq {
  assetDescription?: string;
  roomNumber: string;
  assetAvailability?: Availability[];
  amenities?: Types.ObjectId[];
  photoURLs?: string[];
  assetType: string;
  publishingStatus?: AssetPubStatus;
  peopleCapacity?: number[];
  leaseCondition: {
    dailyPrice?: number;
    leaseType?: LeaseType;
  };
  leasingCompany: ObjectId;
}
