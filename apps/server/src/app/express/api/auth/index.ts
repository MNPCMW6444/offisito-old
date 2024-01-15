import { Router } from "express";
import logRouter from "./routers/logRouter";

const router = Router();

router.use("/log", logRouter);
//router.use("/manage", manageRouter);

export default router;
