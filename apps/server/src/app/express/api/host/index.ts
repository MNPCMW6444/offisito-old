import { Router } from "express";
import assetsRouter from "./assets";

const router = Router();

router.use("/assets", assetsRouter);

export default router;
