import { Router } from "express";
import auth from "./auth";
import geo from "./geo/geoRouter";
import AssetGlobalRouter from "./assets/AssetGlobalRouter";
import chat from "./chat";

const router = Router();

router.use("/auth", auth);
router.use("/host", AssetGlobalRouter);
router.use("/geo", geo);
router.use("/chat", chat);

export default router;
