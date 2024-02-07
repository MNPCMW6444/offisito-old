import { User } from "../../../mongo";
import { Types } from "mongoose";

export interface CreateCompanyReq{
    host : User,
    companyName: string,
    companyInHold?: string,
    floorNumber : string,
    fullFloor?: boolean,
    contractEndDate?:Date,
    subleasePermission?: boolean,
    building?: Types.ObjectId,
}