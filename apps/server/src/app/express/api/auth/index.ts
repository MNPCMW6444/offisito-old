import { Router } from "express";
import logRouter from "./routers/logRouter";
import registerRouter from "./routers/registerRouter";

const router = Router();

router.use("/log", logRouter);
//router.use("/manage", manageRouter);
router.use("/register", registerRouter);

export default router;
