import { Router } from "express";
import auth from "./auth";
import assets from "./assets/Routers";
import geo from "./geo/geoRouter";

const router = Router();

router.use("/auth", auth);
router.use("/assets", assets);
router.use("/geo", geo);

export default router;
