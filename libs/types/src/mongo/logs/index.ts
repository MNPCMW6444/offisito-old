import { Document } from "mongoose";
import { User } from "../auth";
import { Asset } from "../assets";

export interface Booking extends Document {
  guest: User;
  asset: Asset;
  daysInWeek: {
    sun: boolean;
    mon: boolean;
    tues: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
  };
  //payment: Payment TODO: Add the Payment model interface when ready michael@offisito.com
  startDate: Date;
  endDate: Date;
  status: "pending" | "active" | "paused" | "archived";
}
