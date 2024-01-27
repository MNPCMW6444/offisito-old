import { Router } from "express";
import { createAsset } from "./assetsController";

const assetsRouter = Router();

assetsRouter.post("/create", createAsset);

export default assetsRouter;
