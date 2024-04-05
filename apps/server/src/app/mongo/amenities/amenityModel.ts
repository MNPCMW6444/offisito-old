import { getModel } from "..";
import { Amenity, AmenityType } from "@offisito/shared";

export default () =>
  getModel<Amenity>("amenitie", {
    name: { type: String },
    type: { type: String, enum: Object.values(AmenityType) },
  });
