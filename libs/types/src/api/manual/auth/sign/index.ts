import { User } from "../../../../mongo/auth";

export interface GetInReq {}

export interface GetInRes {
  errorMessage?: string;
  user?: User;
}

export interface PostInReq {
  email: string;
}

export interface PostInRes {
  errorMessage?: string;
}
