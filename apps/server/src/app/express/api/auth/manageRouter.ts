import { Router } from "express";
import { PassResetFin, PassResetReq } from "@monorepo/types";
import userModel from "../../../mongo/auth/userModel";
import { v4 } from "uuid";
import settings from "../../../../config";
import { resetPassword } from "../../../../assets/email-templates/authEmails";
import { sendEmail } from "../../../email/sendEmail";
import zxcvbn from "zxcvbn";
import { MIN_PASSWORD_STRENGTH } from "@monorepo/utils";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import passResetRequestModel from "../../../mongo/auth/passResetRequestModel";
import PassResetRequestModel from "../../../mongo/auth/passResetRequestModel";

const router = Router();

router.post<PassResetReq, string>("/passresetreq", async (req, res, next) => {
  try {
    const PassResetRequest = passResetRequestModel();

    const { email, client } = req.body as PassResetReq;
    if (!email || !client)
      return res.status(400).send("email and client are required");

    const key = v4();
    await new PassResetRequest({
      email,
      key,
    }).save();

    const url = `${client === "guest" ? settings.clientDomains.guest : client === "host" ? settings.clientDomains.host : settings.clientDomains.admin}/?rescode=${key}`;

    const { subject, body } = resetPassword(url);
    sendEmail(email, subject, body).then(
      () =>
        settings.whiteEnv === "local" &&
        console.log("tried to send pass reset email - link is: " + url),
    );
    return res.status(200).send("email sent successfully");
  } catch (error) {
    next(error);
  }
});

router.post<PassResetFin, string>("/passresetfin", async (req, res, next) => {
  try {
    const User = userModel();
    const PassResetRequest = PassResetRequestModel();
    const { key, password, passwordAgain } = req.body as PassResetFin;
    if (!key || !password || !passwordAgain)
      return res
        .status(400)
        .send("key, password and passwordAgain and type are required");

    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < MIN_PASSWORD_STRENGTH)
      return res.status(400).send("Password is too weak");

    if (password !== passwordAgain)
      return res.status(400).send("Passwords don't match");

    const exisitngPassResetRequest = await PassResetRequest.findOne({
      key,
    });
    if (!exisitngPassResetRequest) {
      return res.status(400).send("Wrong key");
    }

    const existingUser = await User.findOne({
      email: exisitngPassResetRequest.email,
    });

    const salt = await bcrypt.genSalt();
    existingUser.passwordHash = await bcrypt.hash(password, salt);

    await existingUser.save();

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
