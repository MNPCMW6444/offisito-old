import { Router } from "express";
import auth from './auth';

const router = Router();

router.use("/auth", auth);
router.use("/host", auth);

export default router;
