import { Router } from "express";
import assetModel from "../../../mongo/assets/assetModel";
import multer from "multer";
import { Upload } from "@aws-sdk/lib-storage";
import { S3 } from "@aws-sdk/client-s3";
import { Asset } from "@monorepo/types";
import settings from "../../../../config";

const s3 = new S3({
  credentials: {
    accessKeyId: settings.aws.keyID,
    secretAccessKey: settings.aws.secretKey,
  },

  region: settings.aws.region,
});

const upload = multer({});

const router = Router();

// fetch one asset by id
// or many by params - not implemented yet
// returns an array of assets - if fetched one by id then with a single asset
router.get<{ _id: string; location: string }, Asset[]>(
  "/:_id/:location",
  async (req, res) => {
    try {
      const Asset = assetModel();
      const assets = req.params._id
        ? [await Asset.findById(req.params._id)]
        : await Asset.find(/*{ params }*/);
      if (!assets) {
        return res.status(404).send();
      }
      res.json(assets);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  },
);

// create a new asset, no
router.post<undefined, Asset>("/", async (req, res) => {
  try {
    const Asset = assetModel();
    const newAsset = new Asset(req.body);
    const savedAsset = await newAsset.save();
    res.status(201).json(savedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.patch<{ newAsset: Asset }, Asset>("/", async (req, res) => {
  try {
    const Asset = assetModel();
    const updatedAsset = await Asset.findByIdAndUpdate(
      req.body.newAsset._id,
      req.body.newAsset,
      { new: true },
    );
    if (!updatedAsset) {
      return res.status(404).send();
    }
    res.json(updatedAsset);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post<{ id: string }, { url: string }>(
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

      ContentType: req.file.mimetype,
    };
    try {
      await new Upload({
        client: s3,
        params,
      }).done();
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
    const deletedAsset = await Asset.findByIdAndDelete(req.params.id);
    if (!deletedAsset) {
      return res.status(404).send();
    }
    res.send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.put<{ id: string }, undefined>("/publish/:id", async (req, res) => {
  try {
    const Asset = assetModel();
    await Asset.findByIdAndUpdate(req.params.id, { status: "pending" });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});
export default router;
