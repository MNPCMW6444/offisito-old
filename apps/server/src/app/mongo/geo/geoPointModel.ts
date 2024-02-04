import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { GeoPoint } from "../../../../../../libs/types/src/mongo/geo";

export default () => {
  const name = "geoPoint";

  const geoPointModel = new mongoose.Schema(
    {
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  let geoPointModelR;
  if (mongoose.models.geoPoint) {
    geoPointModelR = connection.model<GeoPoint>(name);
  } else {
    geoPointModelR = connection.model<GeoPoint>(name, geoPointModel);
  }

  return geoPointModelR;
};
