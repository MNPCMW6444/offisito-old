import { Types } from "mongoose";
import { Availability } from "../../../mongo";
import { GeoPoint } from "../../../mongo";

export interface CreateBuildingReq {
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
    assetsList? : Types.ObjectId[]
}
