import { Types, Document } from "mongoose";
import { User } from "../auth";
 import { Amenities } from "../../index";
import { GeoPoint } from "../geo";

type assetPubStatus = "draft" | "pending" | "active" | "paused" | "archived";

type assetType =  "office" | "openSpace" | "meetingRoom";

type leaseType = "daily" | "dailyDiffered" | "weekly" | "monthly" | "fullYear";

enum WeekDays {
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



export interface companyContract extends Document{
  host : User,
  companyName: string,
  companyInHold: string,
  floorNumber : number[],
  fullFloor: boolean,
  contractEndDate:Date,
  subleasePermission: boolean,
}


export interface Asset extends Document {
  assetDescription: string,
  roomNumber: string,
  availability: Availability,
  amenities: Types.ObjectId[],
  photoURLs: string[],
  assetType: assetType,
  publishingStatus: assetPubStatus,
  peopleCapcity: number[],
  leaseCondition:{
    dailyPrice : number,
    leaseType: leaseType[],
  },
  leasingCompany: companyContract,
  building: AssetBuilding,
};


export interface AssetBuilding extends Document{
  buildingName: string,
  address:{
    street:string,
    city:string,
    country:string,
    geoLocalisation: GeoPoint,
  },
  buildingAmenities: Amenities[],
  buildingAccess: WeekDays[],
  buildingDescription: string,
  assets:Asset[]
  companiesRenting: companyContract[],
}