import { Document } from "mongoose";

export type UserType = "admin" | "host" | "member";

export interface User extends Document {
  phone: string;
  email: string;
  passwordHash?: string;
  name?: string;
  type: UserType;
}

export interface RequestForAccount extends Document {
  email: string;
  key: string;
}

export interface Otp extends Document {
  user: User;
  otp: string;
}

