import { Router } from "express";
import userModel from "../../../mongo/auth/userModel";
import settings from "../../../../config";
import bcrypt from "bcrypt";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { LoginReq, User as UserType } from "@monorepo/types";
import process from "process";

const router = Router();
//const MIN_PASSWORD_STRENGTH = 3;

export const authUser = async (token: string) => {
  try {
    if (!token) return null;
    const validatedUser = jsonwebtoken.verify(
      token as string,
      process.env.JWT + "",
    );
    return userModel().findById((validatedUser as JwtPayload).id);
  } catch (err) {
    return null;
  }
};

router.get<undefined, UserType>("/", async (req, res) => {
  const User = userModel();
  if (User)
    try {
      const user = await authUser(req.cookies.jsonwebtoken);
      if (!user) {
        return res.status(401).send();
      }
      user.passwordHash = "secret";
      return res.json(user);
    } catch (err) {
      return res.status(401).send();
    }
  else return res.status(500).send();
});

router.post<LoginReq, undefined>("/in", async (req, res) => {
  const User = userModel();
  try {
    const { email, password, client } = req.body;
    if (!email) {
      return res.status(400).send();
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(402).send();
    }
    if (
      !(
        client === existingUser.type ||
        (client === "guest" && existingUser.type === "member")
      )
    )
      return res.status(401).send();
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash,
    );
    if (!correctPassword) {
      return res.status(401).send();
    }
    const token = jsonwebtoken.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT + "",
    );
    return res
      .cookie("jsonwebtoken", token, {
        httpOnly: true,
        sameSite:
          (settings.nodeEnv === "development"
            ? "lax"
            : settings.nodeEnv === "production" && "none") || false,
        secure:
          settings.nodeEnv === "development"
            ? false
            : settings.nodeEnv === "production" && true,
      })
      .send();
  } catch (err) {
    return res.status(500).send();
  }
});

router.get<undefined, undefined>("/out", async (_, res) => {
  try {
    return res
      .cookie("jsonwebtoken", "", {
        httpOnly: true,
        sameSite:
          (settings.nodeEnv === "development"
            ? "lax"
            : settings.nodeEnv === "production" && "none") || false,
        secure:
          settings.nodeEnv === "development"
            ? false
            : settings.nodeEnv === "production" && true,
        expires: new Date(0),
      })
      .send();
  } catch (err) {
    return res.status(500).send();
  }
});

export default router;
