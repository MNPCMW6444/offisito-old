import { Schema } from "mongoose";
import { User } from "../auth";
import { Asset } from "../assets";

export interface Booking extends Schema {
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
  //payment: Payment TODO: Add the Payment model interface when ready
  startDate: Date;
  endDate: Date;
}
