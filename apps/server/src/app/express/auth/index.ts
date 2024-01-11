import express from "express";
import signRouter from "./routers/logRouter";

const router = express.Router();

router.use("/sign", signRouter);
//router.use("/manage", manageRouter);


export default router;