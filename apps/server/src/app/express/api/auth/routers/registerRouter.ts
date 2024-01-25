import { Router } from "express";
import userModel from "../../../../mongo/auth/userModel";
import requestForAccountModel from "../../../../mongo/auth/requestForAccountModel";
import { sendEmail } from "../../../../sendgrid/sendEmail";
import { signupreq } from "../../../../../assets/email-templates/authEmails";
import settings from "../../../../../config";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import zxcvbn from "zxcvbn";
import jsonwebtoken from "jsonwebtoken";
import { RegisterFin, RegisterReq } from "@monorepo/types";

const router = Router();

router.post<RegisterReq, undefined>("/req", async (req, res) => {
  const User = userModel();
  const RequestForAccount = requestForAccountModel();
  if (User && RequestForAccount)
    try {
      const { email, client } = req.body;
      if (!email) return res.status(400).send();
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).send();

      const key = v4();

      await new RequestForAccount({
        email,
        key,
      }).save();

      const url = `${client === "guest" ? settings.clientDomains.guest : client === "host" ? settings.clientDomains.host : settings.clientDomains.admin}/register?code=${key}`;

      const { subject, body } = signupreq(url);

      sendEmail(email, subject, body)
        .then(() => console.log("sent registration email - " + body))
        .catch((err) => console.error(err));

      return res.status(200).send();
    } catch (err) {
      console.error(err);

      return res.status(500).send();
    }
  else return res.status(500).send();
});

router.post<RegisterFin, undefined>("/fin", async (req, res) => {
  const User = userModel();
  const RequestForAccount = requestForAccountModel();
  if (User && RequestForAccount)
    try {
      const { key, fullName, password, passwordAgain, type } = req.body;
      if (!key || !fullName || !password || !passwordAgain || !type)
        return res.status(400).send();

      const existingSignupRequest = await RequestForAccount.findOne({ key });
      if (!existingSignupRequest) {
        return res.status(400).send();
      }

      const MIN_PASSWORD_STRENGTH = 3;

      const passwordStrength = zxcvbn(password);

      if (passwordStrength.score < MIN_PASSWORD_STRENGTH)
        return res.status(400).send();

      if (password !== passwordAgain) return res.status(400).send();
      const existingUser = await User.findOne({
        email: existingSignupRequest.email,
      });
      if (existingUser) return res.status(400).send();
      if (!existingSignupRequest) return res.status(400).send();
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      const savedUser = await new User({
        email: existingSignupRequest.email,
        name: fullName,
        passwordHash,
        type,
      }).save();

      const token = jsonwebtoken.sign(
        {
          id: savedUser._id,
        },
        process.env.JWT + "",
      );
      return res
        .cookie("jsonwebtoken", token, {
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
    } catch (err) {
      console.error(err);
      return res.status(500).send();
    }
  else return res.status(500).send();
});

export default router;
