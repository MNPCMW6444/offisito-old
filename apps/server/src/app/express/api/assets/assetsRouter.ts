import { Router } from "express";
import { createAsset } from "./assetsController";
import { Asset } from "@monorepo/types";
import assetModel from "../../../mongo/assets/assetModel";

const assetsRouter = Router();

assetsRouter.post("/create", createAsset);

assetsRouter.get<{ _id: string; location: string }, Asset[]>(
  "/:_id",
  async (req, res) => {
    try {
      const Asset = assetModel();
      if (Asset) {
        const assets = req.params._id
          ? [await Asset.findById(req.params._id)]
          : await Asset.find(/*{ params }*/);
        if (!assets) {
          return res.status(404).send();
        }
        res.json(assets);
      } else throw new Error("no db");
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  },
);

export default assetsRouter;