import { connection } from "../connection";
import mongoose from "mongoose";
import { Model } from "mongoose";
import {GeoJSONPoint } from "@monorepo/types"



// export default const geoJSONSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true,
//   },
//   coordinates: {
//     type: [Number],
//     required: true,
//   },


  
// },
//  if(!connection) throw new Error("No DB Connection In GeoJson");



// const geoJsonModel: Model<GeoJSONPoint> = connection.models['geojson'] || mongoose.model<GeoJSONPoint>('geojson', geoJSONSchema);

// return geoJsonModel

// );




const geoJSONSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

let GeoJSONModel: Model<GeoJSONPoint>;

export default () => {
  if (!connection) {
    throw new Error("No DB Connection In GeoJson");
  }

  GeoJSONModel = GeoJSONModel || connection.models['geojson'] || mongoose.model<GeoJSONPoint>('geojson', geoJSONSchema);

  return GeoJSONModel;
};


