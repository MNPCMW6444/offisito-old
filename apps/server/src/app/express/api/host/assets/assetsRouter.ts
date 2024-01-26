import { Router } from "express";
// import assetModel from "../../../../mongo/assets/assetModel";
import { createAsset } from "./assetscontroller";


export const assetsRouter = Router();


assetsRouter.post('/create', createAsset)