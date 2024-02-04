import { Document, ObjectId } from "mongoose";
import { User } from "../auth";
import { Amenities } from "../../index";
import { GeoPoint } from "../geo";

type assetPubStatus = "draft" | "pending" | "active" | "paused" | "archived";

type assetType = "office" | "openSpace" | "meetingRoom";

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
  days_of_week: WeekDays[];
  start_date: Date;
  end_date: Date;
}

export interface Asset extends Document {
  assetDescription: string;
  roomNumber: string;
  availability: Availability;
  amenities: ObjectId[];
  photoURLs: string[];
  assetType: assetType;
  publishingStatus: assetPubStatus;
  peopleCapcity: number[];
}

export interface AssetBuilding extends Document {
  host: User;
  buildingName: string;
  companyInHold: string;
  address: {
    street: string;
    city: string;
    country: string;
    geoLocalisation: GeoPoint;
  };
  floorNumber: number;
  fullFloor: boolean;
  buildingAmenities: ObjectId[];
  buildingAccess: WeekDays[];
  buildingDescription: string;
  assets: Asset[];
}
