import { Router } from "express";
import { createAsset } from "./assetscontroller";

const assetsRouter = Router();

assetsRouter.post("/create", createAsset);

export default assetsRouter;
