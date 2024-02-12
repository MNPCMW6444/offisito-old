import { Router } from "express";
import { Request } from "../../middleware";
import {
  MIN_PASSWORD_STRENGTH,
  PassResetFinReq,
  PassResetReqReq,
  UpdatePasswordReq,
} from "@monorepo/shared";
import userModel from "../../../mongo/auth/userModel";
import { v4 } from "uuid";
import settings from "../../../../config";
import { resetPassword } from "../../../../assets/email-templates/authEmails";
import { sendEmail } from "../../../email/sendEmail";
import zxcvbn from "zxcvbn";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import passResetRequestModel from "../../../mongo/auth/passResetRequestModel";
import PassResetRequestModel from "../../../mongo/auth/passResetRequestModel";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../../s3";

const router = Router();

router.post<PassResetReqReq, string>(
  "/passresetreq",
  async (req, res, next) => {
    try {
      const PassResetRequest = passResetRequestModel();

      const { email, client } = req.body as PassResetReqReq;
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
  },
);

router.post<PassResetFinReq, string>(
  "/passresetfin",
  async (req, res, next) => {
    try {
      const User = userModel();
      const PassResetRequest = PassResetRequestModel();
      const { key, password, passwordAgain } = req.body as PassResetFinReq;
      if (!key || !password || !passwordAgain)
        return res
          .status(400)
          .send("key, password, passwordAgain and type are required");

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
  },
);

router.put("/update-password", async (req: Request, res, next) => {
  try {
    if (!req.user) return res.status(401).send("Please Login");
    const { currentPassword, newPassword, newPasswordAgain } =
      req.body as UpdatePasswordReq;
    if (!currentPassword || !newPassword || !newPasswordAgain)
      return res
        .status(400)
        .send("currentPassword, newPassword and newPasswordAgain are required");

    const correctPassword = await bcrypt.compare(
      currentPassword,
      req.user.passwordHash,
    );
    if (!correctPassword) {
      return res.status(401).send("Wrong password");
    }

    const passwordStrength = zxcvbn(newPassword);
    if (passwordStrength.score < MIN_PASSWORD_STRENGTH)
      return res.status(400).send("Password is too weak");

    if (newPassword !== newPasswordAgain)
      return res.status(400).send("Passwords don't match");

    const salt = await bcrypt.genSalt();
    req.user.passwordHash = await bcrypt.hash(newPassword, salt);

    await req.user.save();

    return res.status(201).send("Password successfully updated");
  } catch (error) {
    next(error);
  }
});

const upload = multer({ storage: multer.memoryStorage() });

export const bucketName =
  settings.whiteEnv === "prod"
    ? "offisito-prod-images"
    : "offisito-preprod-images";

router.put(
  "/update-profile-picture",
  upload.single("file"),
  async (req: Request, res, next) => {
    try {
      if (!req.user) return res.status(401).send("Please Login");
      if (!req.file) {
        return res.status(400).send("No file received");
      }
      const key = `user/${req.user._id.toString()}/profile-pictures/${req.file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });

      await s3Client.send(command);

      req.user.profilePictureUrlKey = key;
      await req.user.save();

      res.status(201).send("Photo updated successfully");
    } catch (error) {
      next(error);
    }
  },
);
export default router;
