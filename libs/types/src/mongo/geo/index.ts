import { Document } from "mongoose";

export interface GeoPoint extends Document {
  coordinates: number[];
}
