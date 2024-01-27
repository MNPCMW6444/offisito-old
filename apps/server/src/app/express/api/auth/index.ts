import { Router } from "express";
import logRouter from "./logRouter";
import registerRouter from "./registerRouter";

const router = Router();

router.use("/log", logRouter);
//router.use("/manage", manageRouter);
router.use("/register", registerRouter);

export default router;
