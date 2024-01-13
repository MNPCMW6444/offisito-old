import { Schema } from "mongoose";

export interface User extends Schema {
  phone: string;
  email: string;
  passwordHash?: string;
  name?: string;
  type: "admin" | "host" | "member";
}
