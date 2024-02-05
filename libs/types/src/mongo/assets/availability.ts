

export enum WeekDays {
    Sunday = "sunday",
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday",
  }
  
export type TimeRange ={
start: string,
end: string,
}

export interface Availability {
days_of_week: WeekDays[],
time_range: TimeRange[],


}