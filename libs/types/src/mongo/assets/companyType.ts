import { Types, Document, ObjectId } from "mongoose";
import { User } from "../auth";
import { Building } from "./buildingType";


export interface Company extends Document{
    host : User,
    companyName: string,
    companyInHold?: string,
    floorNumber : string,
    fullFloor?: boolean,
    contractEndDate?:Date,
    subleasePermission?: boolean,
    building: ObjectId | Building,
  }
  
