import { Router } from "express";
import auth from "./auth";
import host from "./host";

const router = Router();

router.use("/auth", auth);
router.use("/host", host);

export default router;
