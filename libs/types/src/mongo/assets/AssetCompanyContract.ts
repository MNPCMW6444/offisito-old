import { Types, Document } from "mongoose";
import { User } from "../auth";
import { AssetBuilding } from "./AssetBuilding";


export interface AssetCompanyContract extends Document{
    host : User,
    companyName: string,
    companyInHold?: string,
    floorNumber : string,
    fullFloor?: boolean,
    contractEndDate?:Date,
    subleasePermission?: boolean,
    building?: Types.ObjectId |AssetBuilding,
  }
  

//   insurence for the property?
// insurence for the liability / individual 
// who is in charge of cancelation policy?
// how to draw the line between what is required by the Ownner/ leaser/ offisito?

