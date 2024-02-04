import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { GeoJSONPoint } from "@monorepo/types";

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
    geoPointModelR = connection.model<GeoJSONPoint>(name);
  } else {
    geoPointModelR = connection.model<GeoJSONPoint>(name, geoPointModel);
  }

  return geoPointModelR;
};
