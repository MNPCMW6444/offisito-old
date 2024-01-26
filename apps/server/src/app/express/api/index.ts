import { Router } from "express";
import auth from "./auth";
import assets from "./assets";

const router = Router();

router.use("/auth", auth);
router.use("/assets", assets);

export default router;
