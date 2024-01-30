import { Document } from "mongoose";
import { User } from "@monorepo/types";

// The Asset Interface will require a minimum of Name for office in order to have an editable Form to add all necessary information
export interface Amenities {
  freeWiFi?: boolean;
  parking?: boolean;
  lobbySpace?: boolean;
  computer?: boolean;
}

export interface Availability {
  sun?: boolean;
  mon?: boolean;
  tues?: boolean;
  wed?: boolean;
  thu?: boolean;
  fri?: boolean;
  sat?: boolean;
}

type assetStatus = "draft" | "pending" | "active" | "paused" | "archived";

export interface Asset extends Document {
  host: User;
  officeName: string;
  desc?: string;
  amenities?: Amenities;
  companyInHold?: string;
  floor?: string;
  availability?: Availability;
  photoURLs?: string[];
  status?: assetStatus;
  // location?: GeoJSONPoint;

}
