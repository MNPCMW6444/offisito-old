import { Router } from "express";
import auth from "./auth";
import host from "./host";
import settings from "../../../config";
// eslint-disable-next-line @nx/enforce-module-boundaries
import pack from "../../../../../../package.json";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    status: "Im alive",
    version: pack.version,
    whiteEnv: settings.whiteEnv,
  });
});

router.use("/auth", auth);
router.use("/host", host);

export default router;
