import { Types, Document } from "mongoose";
import { User } from "../auth";
import { AssetBuilding } from "./AssetBuilding";


export interface AssetCompanyContract extends Document{
    host : User,
    companyName: string,
    companyInHold?: string,
    floorNumber : number[],
    fullFloor?: boolean,
    contractEndDate?:Date,
    subleasePermission?: boolean,
    building?: Types.ObjectId |AssetBuilding,
  }
  