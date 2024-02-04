import { Types, Document } from "mongoose";
import { User } from "../auth";
import { GeoPoint } from "../geo";

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

export enum WeekDays {
  Sunday = "sunday",
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
}

export interface Availability {
  days_of_week: WeekDays[],
  start_date: Date,
  end_date : Date,
}


export interface AssetCompanyContract extends Document{
  host : User,
  companyName: string,
  companyInHold: string,
  floorNumber : number[],
  fullFloor: boolean,
  contractEndDate:Date,
  subleasePermission: boolean,
  building: Types.ObjectId,
  assets: Types.ObjectId[]
}


export interface Asset extends Document {
  host: User,
  assetDescription: string,
  roomNumber: string,
  availability: WeekDays[],
  amenities: Types.ObjectId[],
  photoURLs: string[],
  assetType: AssetType,
  publishingStatus: AssetPubStatus,
  peopleCapcity: number[],
  leaseCondition:{
    dailyPrice : number,
    leaseType: LeaseType[],
  },
  leasingCompany: Types.ObjectId |AssetCompanyContract,
};


export interface AssetBuilding extends Document{
  buildingName: string,
  address:{
    street:string,
    city:string,
    country:string,
    geoLocalisation: GeoPoint,
  },
  buildingAmenities: Types.ObjectId[],
  buildingAccess: WeekDays[],
  buildingDescription: string,
  assets:Types.ObjectId[] | Asset[]
  companiesRenting: Types.ObjectId[] | AssetCompanyContract[],
}