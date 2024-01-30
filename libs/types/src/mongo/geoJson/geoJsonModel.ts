// import { GeoJSON } from 'geojson';
import mongoose from "mongoose";
// import { GeoJSON } from '@types/geojson';



interface GeoJSONPoint {
    type: 'Point';
    coordinates: [number, number];
  }
  
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
  
//   const GeoJSONModel = mongoose.model<GeoJSONPoint & Document>('GeoJSON', geoJSONSchema);
  
  