import { Router } from "express";
import { createAsset, 
         getAssetsList, 
         getAssetDetail } from "./assetsController";
import { Asset } from "@monorepo/types";
import assetModel from "../../../mongo/assets/assetModel";

const assetsRouter = Router();

assetsRouter.post("/create", createAsset);
assetsRouter.get("/assets_list/:host_id", getAssetsList)
assetsRouter.get("/assetDetail/:asset_id", getAssetDetail)


assetsRouter.get<{ _id: string; location: string }, Asset[]>(
  "/:_id",
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

export default assetsRouter;
