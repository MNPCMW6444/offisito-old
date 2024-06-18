import { AmenityType } from "@offisito/shared";
import AmenityModel from "../../../services/mongo/amenities/amenityModel";
import { validateExisting } from "../../";

const validateAmenityType = (type: string): boolean | string[] => {
  const types = Object.values(AmenityType);
  return !types.some((value) => value === type) || types;
};

const createNewAmenity = async (validName: string, validType: string) =>
  await new (AmenityModel())({
    name: validName,
    type: validType,
  }).save();

const updateAmenity = async (
  id: string,
  validName: string,
  validType: AmenityType,
) => {
  const doc = await AmenityModel().findById(id);
  if (!doc) return { code: 404, body: "Amenity with this ID was'nt found" };
  if (validName) doc.name = validName;
  if (validType) doc.type = validType;
  await doc.save();
};

export const validateAndCreateAmenity = async (name: string, type: string) => {
  if (!validateExisting(name)) return { code: 400, body: "Name is required" };
  if (!validateExisting(type)) return { code: 400, body: "Type is required" };
  const typeValidity = !validateAmenityType(type);
  if (typeValidity !== true)
    return {
      code: 400,
      body: "type must be one of these: " + JSON.stringify(typeValidity),
    };
  await createNewAmenity(name, type);
};

export const validateAndUpdateAmenity = async (
  id: string,
  name: string,
  type: AmenityType,
) => {
  if (!validateExisting(id)) return { code: 400, body: "ID is required" };
  const typeValidity = !validateAmenityType(type);
  if (typeValidity !== true)
    return {
      code: 400,
      body: "type must be one of these: " + JSON.stringify(typeValidity),
    };
  await updateAmenity(id, name, type);
};

export const deleteAmenity = async (id: string) => {
  await AmenityModel().deleteOne({ _id: id });
};
