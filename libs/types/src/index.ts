export * from "./mongo";
export * from "./api";

export interface Amenities {
  freeWiFi: boolean;
  parking: boolean;
  lobbySpace: boolean;
  computer: boolean;
}

export interface Availability {
  sun: boolean;
  mon: boolean;
  tues: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
}
