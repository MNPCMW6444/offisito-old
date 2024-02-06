import { Types, Document } from "mongoose";
import { GeoPoint } from "../geo/GeoPoint";
import { Availability } from "./Availability";
import { Asset } from "./Asset";



export interface AssetBuilding extends Document{
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
    assetsList? : Types.ObjectId | Asset
  }
  


