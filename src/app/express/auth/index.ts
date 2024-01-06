import express from "express";
import signRouter from "./routers/signRouter";

const router = express.Router();

router.use("/sign", signRouter);
//router.use("/manage", manageRouter);


export default router;