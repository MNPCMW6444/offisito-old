import { Router } from "express";
import { createAsset, 
         getAssetsList, 
         getAssetDetail } from "./assetsController";
// import { Asset } from "@monorepo/types";
// import assetModel from "../../../mongo/assets/assetModel";

const assetsRouter = Router();

assetsRouter.post("/create", createAsset);
assetsRouter.get("/assets_list/:host_id", getAssetsList)
assetsRouter.get("/assetDetail/:asset_id", getAssetDetail)



export default assetsRouter
