import { Document } from "mongoose";

export type UserType = "admin" | "host" | "member";

export interface User extends Document {
  phone: string;
  email: string;
  passwordHash?: string;
  name?: string;
  type: UserType;
  profilePictureUrlKey?: string;
}

export interface RegistrationRequest extends Document {
  email: string;
  key: string;
}

export interface PassResetRequest extends Document {
  email: string;
  key: string;
}
