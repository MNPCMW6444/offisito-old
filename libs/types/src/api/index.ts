import { LeaseType, UserType } from "../mongo";
// import { Amenities, Availability } from "../index";

export type WhiteClient = "host" | "guest";

export interface LoginReq {
  email: string;
  password: string;
  client: WhiteClient;
}

export interface RegisterReq {
  email: string;
  client: WhiteClient;
}

export interface RegisterFin {
  key: string;
  password: string;
  passwordAgain: string;
  fullName: string;
  type: UserType;
}

// export interface ListAssetReq {
//   officeName: string;
//   desc?: string;
//   amenities?: Amenities;
//   companyInHold?: string;
//   floor?: string;
//   availability?: Availability;
// }

export interface PassResetReq {
  email: string;
  client: string;
}

export interface PassResetFin {
  key: string;
  password: string;
  passwordAgain: string;
}

export interface CreateAssetReq {
  assetDescription?: string;
  roomNumber: string;
  assetAvailability?: string;
  amenities?: string;
  photoURLs?: string;
  assetType: string;
  publishingStatus?: string;
  peopleCapacity?: string;
  leaseCondition: {
    dailyPrice?: number;
    leaseType?: LeaseType;
  };
  leasingCompany: string;
}
