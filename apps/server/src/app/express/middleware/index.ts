import errorLogModel from "../../mongo/logs/errorLogModel";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import settings from "../../../config";
import userModel from "../../mongo/auth/userModel";
import { Request as ExpressRequest } from "express";
import { User } from "@offisito/shared";

export interface AuthenticatedRequest extends ExpressRequest {
  user: User | null;
}

export const serverErrorHandler = async (err, res) => {
  const Error = errorLogModel();
  if (res.statusCode === 500 && Error) {
    try {
      await new Error({ stringifiedError: JSON.stringify(err) }).save();
      console.log("500 Error was logged to mongo");
    } catch (e) {
      console.log("Error logging error to mongo: ", e);
    }
    return res.status(500).send("Server error");
  }
};

export const authRequester = async (req, _, next) => {
  try {
    const validatedUser = jsonwebtoken.verify(
      req.cookies.jwt,
      settings.jwtSecret,
    );
    req.user = await userModel().findById((validatedUser as JwtPayload).id);
  } catch (err) {
    req.user = null;
  }
  next();
};

export const adminAuth = async (req: AuthenticatedRequest, res, next) =>
  req.user.type === "admin"
    ? next()
    : res.status(401).send("You are not an Admin");
