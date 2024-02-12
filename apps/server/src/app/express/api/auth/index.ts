import { Router } from "express";
import logRouter from "./logRouter";
import registerRouter from "./registerRouter";
import manageRouter, { bucketName } from "./manageRouter";
import { Request } from "../../middleware";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../../../s3";

const router = Router();

router.use("/log", logRouter);
router.use("/manage", manageRouter);
router.use("/register", registerRouter);

router.get("/get-signed-profile-picture", async (req: Request, res, next) => {
  if (!req.user) return res.status(401).send("Unauthorized");

  if (!req.user || !req.user.profilePictureUrlKey)
    return res.status(404).send("Profile picture not found");

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: req.user.profilePictureUrlKey,
  });

  try {
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 1800,
    });
    res.status(200).send(signedUrl);
  } catch (error) {
    next(error);
  }
});

export default router;
