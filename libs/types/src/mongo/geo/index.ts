export interface GeoPoint extends Document {
  type: "Point";
  coordinates: [number, number];
}
