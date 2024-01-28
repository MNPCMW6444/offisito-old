import { UserType } from "../mongo";
import { Amenities } from "../index";

export type WhiteClient = "host" | "guest";

export interface LoginReq {
  email: string;
  password: string;
  client: WhiteClient;
}

export interface RegisterReq {
  email: string;
  client: WhiteClient;
}

export interface RegisterFin {
  key: string;
  password: string;
  passwordAgain: string;
  fullName: string;
  type: UserType;
}

export interface ListAssetReq {
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
}
