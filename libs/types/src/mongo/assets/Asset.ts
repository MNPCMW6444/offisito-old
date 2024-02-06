import { Types, Document } from "mongoose";
import  {Availability}  from "./Availability";
import { AssetCompanyContract } from "./AssetCompanyContract";

export enum AssetPubStatus{ Draft = 'draft',
                             Pending = 'pending',
                             Active = 'active',
                             Paused = 'paused',
                             Archived = 'archived',}
 export enum AssetType {
                        Office = 'office',
                        OpenSpace = 'openSpace',
                        MeetingRoom = 'meetingRoom',
 }

 export enum LeaseType{ 
                    Daily = 'daily',
                    DailyDiffered = 'dailyDiffered',
                    Weekly = 'weekly',
                    Monthly = 'monthly',
                    FullYear = 'fullYear',
 }



export interface Asset extends Document {
    assetDescription?: string,
    roomNumber: string,
    assetAvailability?: Availability[],
    amenities?: Types.ObjectId[],
    photoURLs?: string[],
    assetType: AssetType,
    publishingStatus: AssetPubStatus,
    peopleCapacity?: number[],
    leaseCondition:{
      dailyPrice? : number,
      leaseType?: LeaseType[],
    },
    leasingCompany: Types.ObjectId | AssetCompanyContract

  };
  

// who is manageing the price calculation?
// do we ask for a basic daily price, then do we create a global caluclation per contract type?
// will someone who take rental contract will pay the same for oneweek ration or one year 
// what are cancelation policies?
// Who will ose the money?

// any issues on some part to have many renter a year - on legal /Tax wise?
// will offisito well have agreemeent for ex then short tiem renter will be under their contract ?
// 