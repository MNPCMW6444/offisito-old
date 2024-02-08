import { Router } from "express";
import conversationsRouter from "./conversationsRouter";

const router = Router();

router.use("/conversations", conversationsRouter);

export default router;
