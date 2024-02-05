import { Router } from "express";
import userModel from "../../../mongo/auth/userModel";
import settings from "../../../../config";
import bcrypt from "bcrypt";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { LoginReq, User, User as UserType } from "@monorepo/types";
import { Request } from "../../middleware";

const router = Router();

router.get("/", async (req: Request, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("Not Logged In");
    }
    req.user.passwordHash = "secret";
    return res.json(req.user);
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
