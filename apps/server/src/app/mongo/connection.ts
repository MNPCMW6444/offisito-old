import mongoose from "mongoose";
import settings from "../../config";

export let connection: mongoose.Connection | null = null;

export const connect = async () => {
  console.log("***********CONNECTED ");
  settings.nodeEnv === "development" && mongoose.set("debug", true);
  try {
    await mongoose.connect(
      settings.mongoURI || "mongodb://localhost:27017/error",
    );
    console.log("Mongo DB connected successfully");
    connection = mongoose.connection;
  } catch (err) {
    console.error("mongo connection error:" + err.message);
    throw new Error(err);
  }
};
