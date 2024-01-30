import { Document } from "mongoose";


export interface GeoJSONPoint extends Document{
    type: 'Point';
    coordinates: [number, number];
  }
  