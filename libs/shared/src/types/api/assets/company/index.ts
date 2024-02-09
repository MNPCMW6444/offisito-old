import { ObjectId } from "mongoose";

export interface CreateEditCompanyReq {
  companyName: string;
  companyInHold?: string;
  floorNumber: string;
  fullFloor?: boolean;
  contractEndDate?: Date;
  subleasePermission?: boolean;
  building: ObjectId;
}
