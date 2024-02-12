import { Router } from "express";
import userModel from "../../../mongo/auth/userModel";
import registrationRequestModel from "../../../mongo/auth/registrationRequestModel";
import { sendEmail } from "../../../email/sendEmail";
import {
  hostRegisterReq,
  memberRegisterReq,
} from "../../../../assets/email-templates/authEmails";
import settings from "../../../../config";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import zxcvbn from "zxcvbn";
import jsonwebtoken from "jsonwebtoken";
import {
  MIN_PASSWORD_STRENGTH,
  RegisterFinReq,
  RegisterReq,
} from "@monorepo/shared";

const router = Router();

router.post("/req", async (req, res, next) => {
  try {
    const User = userModel();
    const RegistrationRequest = registrationRequestModel();

    const { email, client } = req.body as RegisterReq;
    if (!email || !client)
      return res.status(400).send("email and client are required");

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .send(
          "An account with this email already exists, Try to login instead",
        );

    const key = v4();
    await new RegistrationRequest({
      email,
      key,
    }).save();

    const url = `${client === "guest" ? settings.clientDomains.guest : client === "host" ? settings.clientDomains.host : settings.clientDomains.admin}/?regcode=${key}`;

    const { subject, body } =
      client === "guest" ? memberRegisterReq(url) : hostRegisterReq(url);
    sendEmail(email, subject, body).then(
      () =>
        settings.whiteEnv === "local" &&
        console.log("tried to send registration email - link is: " + url),
    );
    return res.status(200).send("email sent successfully");
  } catch (error) {
    next(error);
  }
});

router.post<RegisterFinReq, string>("/fin", async (req, res, next) => {
  try {
    const User = userModel();
    const RegistrationRequest = registrationRequestModel();
    const { key, fullName, password, passwordAgain, type } = req.body;
    if (!key || !fullName || !password || !passwordAgain || !type)
      return res
        .status(400)
        .send("key, fullName, password, passwordAgain and type are required");

    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < MIN_PASSWORD_STRENGTH)
      return res.status(400).send("Password is too weak");

    if (password !== passwordAgain)
      return res.status(400).send("Passwords don't match");

    const existingRegistrationRequest = await RegistrationRequest.findOne({
      key,
    });
    if (!existingRegistrationRequest) {
      return res.status(400).send("Wrong key");
    }

    const existingUser = await User.findOne({
      email: existingRegistrationRequest.email,
    });
    if (existingUser)
      return res
        .status(400)
        .send("Email is already in use or account already exists");

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const savedUser = await new User({
      email: existingRegistrationRequest.email,
      name: fullName,
      passwordHash,
      type,
    }).save();

    const token = jsonwebtoken.sign(
      {
        id: savedUser._id,
      },
      settings.jwtSecret,
    );

    return res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite:
          process.env.NODE_ENV === "development"
            ? "lax"
            : process.env.NODE_ENV === "production"
              ? "none"
              : "lax",
        secure:
          process.env.NODE_ENV === "development"
            ? false
            : process.env.NODE_ENV === "production" && true,
      })
      .send();
  } catch (error) {
    next(error);
  }
});

export default router;
