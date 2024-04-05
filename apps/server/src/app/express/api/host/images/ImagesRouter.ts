import { Router } from "express";
import { getAssetImageAws } from "./controllers/read_asset_images";
import { uploadAndUpdateFloorImages } from "./controllers/add_floor_images";
import { uploadAndUpdateBuildingImage } from "./controllers/add_building_images";
import { TODO } from "@offisito/shared";
import { s3Client } from "../../../../s3";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { bucketName } from "../../auth/manageRouter";
import multer from "multer";
import assetModel from "../../../../mongo/assets/assetModel";
import { AuthenticatedRequest } from "../../../middleware";
import Sharp from "sharp";

const imageRouter = Router();

const upload = multer({ storage: multer.memoryStorage() });

imageRouter.put(
  "/upload_asset_img/:asset_id",
  upload.array("files", 6),
  async (req: TODO, res, next) => {
    try {
      if (!req.user) return res.status(401).send("Please Login");
      if (!req.files) return res.status(400).send("No files received");
      if (!req.params.asset_id)
        return res.status(400).send("No asset_id received");

      const asset = await assetModel().findById(req.params.asset_id);

      const promises = req.files.map((file: TODO) => {
        const originalKey = `asset/${req.params.asset_id}/pictures/${file.originalname}`;
        s3Client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: originalKey,
            Body: file.buffer,
            ContentType: file.mimetype,
          }),
        );
        return originalKey;
      });

      Promise.all(promises).then(async (keys) => {
        asset.photos = [...keys];
        await asset.save();
        return res.status(201).send("Photo updated successfully");
      });
    } catch (error) {
      next(error);
    }
  },
);

imageRouter.put(
  "/cropPicture",
  async (req: AuthenticatedRequest, res, next) => {
    try {
      if (!req.user) return res.status(401).send("Please Login");
      const { key, assetId, crop } = req.body;
      const { width, height, x, y } = crop;
      if (!width && width !== 0)
        return res.status(400).send("No width received");
      if (!height && height !== 0)
        return res.status(400).send("No height received");
      if (!x && x !== 0) return res.status(400).send("No x received");
      if (!y && y !== 0) return res.status(400).send("No y received");

      if (!key) return res.status(400).send("No picture key received");

      if (!assetId) return res.status(400).send("No asset id received");

      const asset = await assetModel().findById(assetId);

      if (!asset) return res.status(404).send("No asset with this id found");

      if (!asset.photos.some((picture) => picture === key))
        return res
          .status(404)
          .send("No picture with this key found in this asset");

      const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
      const { Body } = await s3Client.send(command);

      if (Body instanceof ReadableStream || Body instanceof Blob) {
        console.error(
          "Handling of the Body depends on your environment (Node.js or browser).",
        );
        return res.status(500).send("Error processing image data");
      }

      const imageBuffer = await new Promise<Buffer>((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        Body.on("data", (chunk) => chunks.push(chunk));
        Body.on("end", () => resolve(Buffer.concat(chunks)));
        Body.on("error", reject);
      });

      console.log({
        width: parseInt(width),
        height: parseInt(height),
        left: parseInt(x),
        top: parseInt(y),
      });

      const croppedImage = await Sharp(imageBuffer)
        .extract({
          width: parseInt(width),
          height: parseInt(height),
          left: parseInt(x),
          top: parseInt(y),
        })
        .toBuffer();

      // Saving the cropped image back to S3 using SDK v3
      const newKey = `cropped-${key}`;
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: newKey,
          Body: croppedImage,
          ContentType: "image/jpeg", // Adjust based on your image type
        }),
      );

      console.log(`Image cropped and saved as ${newKey}`);
      res.send({ message: `Image cropped and saved as ${newKey}` });
    } catch (error) {
      console.error("Error processing request:", error);
      next(error);
    }
  },
);

imageRouter.get("/get_image_aws/:key*", getAssetImageAws);

imageRouter.put(
  "/upload_floor_image/:company_id/:floor_number",
  uploadAndUpdateFloorImages,
);

imageRouter.put(
  "/upload_building_image/:building_id",
  uploadAndUpdateBuildingImage,
);

export default imageRouter;
