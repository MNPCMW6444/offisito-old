import { Types, Document } from "mongoose";
import { GeoPoint } from "../geo";
import { Availability } from "./AvailabilityType";
import { Asset } from "./AssetType";



export interface Building extends Document{
    buildingName: string,
    address:{
      street:string,
      city:string,
      country:string,
      geoLocalisation: GeoPoint,
    },
    buildingAmenities?: Types.ObjectId[],
    buildingAccess?: Availability[],
    buildingDescription?: string,
    doorman?: boolean,
    security?: boolean,
    vip_service?: boolean,
    assetsList? : Types.ObjectId[] | Asset
  }
  