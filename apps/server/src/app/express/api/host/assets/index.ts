import { Router } from "express";
import assetModel from "../../../../mongo/assets/assetModel";

const router = Router();

router.post("/create", async (req, res) => {
  const { a, b, c, d } = req.body;
  const Asset = assetModel();
  const newAsset = new Asset({ a, b, c, d });
  await newAsset.save();
  return res.status(200).json({ meesage: "success" });
});

export default router;
