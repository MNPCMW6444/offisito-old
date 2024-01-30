import { Router } from "express";
import userModel from "../../../mongo/auth/userModel";
import settings from "../../../../config";
import bcrypt from "bcrypt";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { LoginReq, User, User as UserType } from "@monorepo/types";

const router = Router();

export const authUser = async (token: string): Promise<User> => {
  try {
    const validatedUser = jsonwebtoken.verify(token, settings.jwtSecret);
    return userModel().findById((validatedUser as JwtPayload).id);
  } catch (err) {
    return null;
  }
};

router.get<undefined, UserType | string>("/", async (req, res, next) => {
  try {
    const user = await authUser(req.cookies.jwt);
    if (!user) {
      return res.status(401).send("Not Logged In");
    }
    user.passwordHash = "secret";
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post<LoginReq, string>("/in", async (req, res, next) => {
  try {
    const User = userModel();
    const { email, password, client } = req.body;
    if (!email || !client)
      return res.status(400).send("email and client are required");

    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(402).send("Please register");
    if (!password) return res.status(400).send("Password is required");
    if (
      client !== existingUser.type &&
      (client !== "guest" || existingUser.type !== "member")
    )
      return res.status(401).send("Please register as a " + client);
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.passwordHash,
    );
    if (!correctPassword) {
      return res.status(401).send("Wrong password");
    }
    const token = jsonwebtoken.sign(
      {
        id: existingUser._id,
      },
      settings.jwtSecret,
    );
    return res
      .cookie("jwt", token, {
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
  } catch (error) {
    next(error);
  }
});

router.get<undefined, string>("/out", async (_, res, next) => {
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
  } catch (error) {
    next(error);
  }
});

export default router;
