import { Router } from "express";
import conversationsRouter from "./conversationsRouter";
import messagesRouter from "./messagesRouter";

const router = Router();

router.use("/conversations", conversationsRouter);
router.use("/messages", messagesRouter);

export default router;
