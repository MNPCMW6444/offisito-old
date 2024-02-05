import { Types, Document, ObjectId } from "mongoose";
import { User } from "../auth";
import { GeoPoint } from "../geo";
import { Availability } from "./availability";
import { AvailabilitySchema } from "../../../../../apps/server/src/app/mongo/assets/availabilitySchema";

export enum AssetPubStatus {
  Draft = "draft",
  Pending = "pending",
  Active = "active",
  Paused = "paused",
  Archived = "archived",
}

export enum AssetType {
  Office = "office",
  OpenSpace = "openSpace",
  MeetingRoom = "meetingRoom",
}

export enum LeaseType {
  Daily = "daily",
  DailyDiffered = "dailyDiffered",
  Weekly = "weekly",
  Monthly = "monthly",
  FullYear = "fullYear",
}

export interface AssetCompanyContract extends Document {
  host: User;
  companyName: string;
  companyInHold: string;
  floorNumber: number[];
  fullFloor: boolean;
  contractEndDate: Date;
  subleasePermission: boolean;
  building: Types.ObjectId;
  assets: Types.ObjectId[];
}

export interface Asset extends Document {
  host: ObjectId;
  assetDescription?: string;
  roomNumber: string;
  assetAvailability?: Availability[];
  amenities?: ObjectId[];
  photoURLs?: string[];
  assetType: AssetType;
  publishingStatus?: AssetPubStatus;
  peopleCapacity?: number[];
  leaseCondition: {
    dailyPrice: number;
    leaseType?: LeaseType[];
  };
  leasingCompany?: ObjectId;
}

export interface AssetBuilding extends Document {
  buildingName: string;
  address: {
    street: string;
    city: string;
    country: string;
    geoLocalisation: GeoPoint;
  };
  buildingAmenities: Types.ObjectId[];
  buildingAccess: Availability[];
  buildingDescription: string;
  assets: Types.ObjectId[];
  companiesRenting: Types.ObjectId[];
  doorman: boolean;
  security: boolean;
  vip_service: boolean;
}
