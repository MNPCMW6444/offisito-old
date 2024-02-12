import { UserType } from "../../mongo";
// import { Amenities, Availability } from "../index";

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

export interface RegisterFinReq {
  key: string;
  password: string;
  passwordAgain: string;
  fullName: string;
  type: UserType;
}

export interface PassResetReqReq {
  email: string;
  client: string;
}

export interface PassResetFinReq {
  key: string;
  password: string;
  passwordAgain: string;
}

export interface UpdatePasswordReq {
  currentPassword: string;
  newPassword: string;
  newPasswordAgain: string;
}
