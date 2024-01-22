import { connection } from "../connection";
import mongoose from "mongoose";
import { versioning } from "@mnpcmw6444/mongoose-auto-versioning";
import { Booking } from "@monorepo/types";

export default () => {
  const name = "booking";

  const bookingModel = new mongoose.Schema(
    {
      guest: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      asset: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      daysInWeek: {
        sun: Boolean,
        mon: Boolean,
        tues: Boolean,
        wed: Boolean,
        thu: Boolean,
        fri: Boolean,
        sat: Boolean,
      },
      payment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
      },
      status: { type: String, required: true },
    },
    {
      timestamps: true,
    },
  ).plugin(versioning, { collection: name + "s.history", mongoose });

  if (!connection) throw new Error("Database not initialized");

  let bookingModelR;
  if (mongoose.models.booking) {
    bookingModelR = connection.model<Booking>(name);
  } else {
    bookingModelR = connection.model<Booking>(name, bookingModel);
  }

  return bookingModelR;
};
