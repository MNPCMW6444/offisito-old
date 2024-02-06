import { getAddressByPoint } from "../../../google-geocoding";
import { Router } from "express";

const router = Router();

router.get<{ pointInString: string }, string>(
  "/getAddress/:pointInString",
  async (req, res, next) => {
    try {
      const [lat, long] = req.params.pointInString
        .split(",")
        .map((str) => parseFloat(str));
      return res.send(await getAddressByPoint(lat, long));
    } catch (error) {
      next(error);
    }
  },
);

export default router;


