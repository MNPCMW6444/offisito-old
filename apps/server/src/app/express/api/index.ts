import { Router } from "express";
import auth from "./auth";
import assets from "./assets/assetsRouter";

const router = Router();

router.use("/auth", auth);
router.use("/assets", assets);

export default router;
