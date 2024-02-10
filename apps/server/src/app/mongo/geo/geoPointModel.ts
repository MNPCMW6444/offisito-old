import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { GeoPoint } from "@monorepo/shared";

export default () => {
  const name = "geoPoint";

  const geoPointSchema = new mongoose.Schema(
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

  let geoPointModel;
  if (mongoose.models.geoPoint) {
    geoPointModel = connection.model<GeoPoint>(name);
  } else {
    geoPointModel = connection.model<GeoPoint>(name, geoPointSchema);
  }

  return geoPointModel;
};
