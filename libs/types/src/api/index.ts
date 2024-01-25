import { UserType } from "../mongo";

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
