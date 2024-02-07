import { LeaseType } from "../../../mongo";

export interface CreateAssetReq {
  assetDescription?: string;
  roomNumber: string;
  assetAvailability?: string;
  amenities?: string;
  photoURLs?: string;
  assetType: string;
  publishingStatus?: string;
  peopleCapacity?: string;
  leaseCondition: {
    dailyPrice?: number;
    leaseType?: LeaseType;
  };
  leasingCompany: string;
}
