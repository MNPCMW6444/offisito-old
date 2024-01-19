import { Schema } from "mongoose";
import { User } from "../auth";

export interface Asset extends Schema {
  host: User;
  officeName: string;
  desc: string;
  amenities: {
    freeWiFi: boolean;
    Parking: boolean;
    lobbySpace: boolean;
    computer: boolean;
  };
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
}
