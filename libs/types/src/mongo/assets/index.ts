import mongoose from "mongoose";
import { Document } from "mongoose";
import { User } from "../auth";
import { Amenities, Availability } from "../../index";

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
  location?: mongoose.Types.ObjectId;
}
