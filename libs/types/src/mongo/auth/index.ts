import { Schema } from "mongoose";

export type UserType = "admin" | "host" | "member";

export interface User extends Schema {
  phone: string;
  email: string;
  passwordHash?: string;
  name?: string;
  type: UserType;
}

export interface RequestForAccount extends Schema {
  email: string;
  key: string;
}

export interface Otp extends Schema {
  user: User;
  otp: string;
}
