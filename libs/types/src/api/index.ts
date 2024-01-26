import { User, UserType } from "../mongo";

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
  amenities: {
    freeWiFi: boolean;
    parking: boolean;
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
