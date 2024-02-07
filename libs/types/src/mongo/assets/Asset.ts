import { Types, Document, ObjectId } from "mongoose";
import { Availability } from "./Availability";

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

export interface Asset extends Document {
  assetDescription?: string;
  roomNumber: string;
  assetAvailability?: Availability[];
  amenities?: Types.ObjectId[];
  photoURLs?: string[];
  assetType: AssetType;
  publishingStatus: AssetPubStatus;
  peopleCapacity?: number[];
  leaseCondition: {
    dailyPrice?: number;
    leaseType?: LeaseType[];
  };
  leasingCompany: ObjectId;
}
