import { ObjectId } from "mongoose";

export interface CreateCompanyReq {
  companyName: string;
  companyInHold?: string;
  floorNumber: string;
  fullFloor?: boolean;
  contractEndDate?: Date;
  subleasePermission?: boolean;
  building: ObjectId;
}
