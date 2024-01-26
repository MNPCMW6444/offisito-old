import { Router } from "express";
import assetModel from "../../../mongo/assets/assetModel";
import multer from "multer";
import AWS from "aws-sdk";
import { Asset } from "@monorepo/types";
import settings from "../../../../config";

declare module "express-serve-static-core" {
  interface Request {
    file?: Express.Multer.File;
  }
}

const s3 = new AWS.S3({
  accessKeyId: settings.aws.keyID,
  secretAccessKey: settings.aws.secretKey,
  region: settings.aws.region,
});

// Multer setup
const upload = multer({
  storage: multer.memoryStorage(), // use memory storage
  limits: { fileSize: 100 * 1024 * 1024 }, // for example, limit file size to 5MB
});

const router = Router();

// GET route: Retrieve a specific asset by some parameters
router.get</*{ params: any }*/ undefined, Asset[]>(
  "/:params",
  async (req, res) => {
    try {
      //    const params = req.params.params;
      const Asset = assetModel();
      if (Asset) {
        const asset = await Asset.find(/*{ params }*/);
        if (!asset) {
          return res.status(404).send();
        }
        res.json(asset);
      } else throw new Error("no db");
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  },
);

// POST route: Create a new asset
router.post<undefined, undefined>("/", async (req, res) => {
  try {
    const Asset = assetModel();
    if (Asset) {
      const newAsset = new Asset(req.body);
      const savedAsset = await newAsset.save();
      res.status(201).json(savedAsset);
    } else throw new Error("no db");
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// PATCH route: Update an existing asset
router.patch<{ id: string }, undefined>("/:id", async (req, res) => {
  try {
    const Asset = assetModel();
    if (Asset) {
      const updatedAsset = await Asset.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedAsset) {
        return res.status(404).send();
      }
      res.json(updatedAsset);
    } else throw new Error("no db");
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post<{ id: string }, undefined>(
  "/uploadPicture/:id",
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send();
    }
    const { id } = req.params;
    const key = `${id}/${req.file.originalname}`;
    const params = {
      Bucket:
        settings.whiteEnv === "prod"
          ? "offisito-prod-images"
          : "offisito-preprod-images",
      Key: key,
      Body: req.file.buffer, // File buffer
      ContentType: req.file.mimetype,
    };
    try {
      await s3.upload(params).promise();
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  },
);

router.delete<{ id: string }, undefined>("/:id", async (req, res) => {
  try {
    const Asset = assetModel();
    if (Asset) {
      const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
      if (!deletedAsset) {
        return res.status(404).send();
      }
      res.send();
    } else throw new Error("no db");
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

export default router;
