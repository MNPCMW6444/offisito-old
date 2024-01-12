import { Router } from "express";
import signRouter from "./routers/logRouter";

const router = Router();

router.use("/sign", signRouter);
//router.use("/manage", manageRouter);


export default router;
