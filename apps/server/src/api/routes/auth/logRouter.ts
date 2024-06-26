import { Router } from "express";
import userModel from "../../../services/mongo/auth/userModel";
import settings from "../../../config";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { LoginReq } from "@offisito/shared";
import { AuthenticatedRequest } from "../../middleware";

const router = Router();

router.get("/:client", async (req: AuthenticatedRequest, res, next) => {
  try {
    if (!req.params.client) return res.status(400).send("Choose a client");
    if (!req.user) return res.status(401).send("Not Logged In");
    if (req.user.type !== req.params.client)
      return res
        .status(400)
        .cookie("jwt", "", {
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
    req.user.passwordHash = "secret";
    return res.json(req.user);
  } catch (error) {
    next(error);
  }
});

router.post<LoginReq, string>("/in", async (req, res, next) => {
  try {
    const User = userModel();
    let { email, password, client } = req.body;
    if (settings.whiteEnv === "local") {
      switch (client) {
        case "guest":
          if (!email) email = "mnpcmw6444@gmail.com";
          if (!password) password = "guestpassword2";
          break;
        case "host":
          if (!email) email = "flighter98311@gmail.com";
          if (!password) password = "danieloffisito1998";
          break;
        case "admin":
          if (!email) email = "daniel@offisito.com";
          if (!password) password = "danieloffisito1998";
          break;
        default:
          break;
      }
    }
    if (!email || !client)
      return res.status(400).send("email and client are required");

    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(401).send("Please register");
    if (
      client !== existingUser.type &&
      (client !== "guest" || existingUser.type !== "guest")
    )
      return res
        .status(401)
        .send(
          client === "admin"
            ? "Please contact the CTO to register as an admin"
            : "Please register as a " + client,
        );
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
      .cookie("jwt", "", {
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
