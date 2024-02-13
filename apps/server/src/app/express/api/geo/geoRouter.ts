import {
  autocompleteAddress,
  getAddressByPoint,
  getPointByAddress,
} from "../../../google-geocoding";
import { Router } from "express";

const router = Router();

router.get<{ pointInString: string }, string>(
  "/getAddress/:pointInString",
  async (req, res, next) => {
    try {
      const [lat, long] = req.params.pointInString
        .split(",")
        .map((str) => parseFloat(str));
      return res.status(200).send(await getAddressByPoint(lat, long));
    } catch (error) {
      next(error);
    }
  },
);

router.get<{ addressInDescriptionString: string }, string>(
  "/getLocation/:addressInDescriptionString",
  async (req, res, next) => {
    try {
      const result = await getPointByAddress(
        req.params.addressInDescriptionString,
      );
      console.log(result);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/autocomplete-address/:query", async (req, res) => {
  const result = await autocompleteAddress(req.params.query);
  if (result) return res.status(200).json(result);
  else return res.status(400).send("google api error");
});

export default router;
