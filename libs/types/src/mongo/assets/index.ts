import { Schema } from "mongoose";
import { User } from "../auth";
import { Amenities } from "../../index";

export interface Asset extends Schema {
  host: User;
  officeName: string;
  desc: string;
  amenities: Amenities;
  companyInHold: string;
  floor: string;
  availability: {
    sun: boolean;
    mon: boolean;
    tues: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
  };
  photoURLs: string[];
  status: "draft" | "pending" | "active" | "paused" | "archived";
}
