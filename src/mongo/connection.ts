import mongoose from "mongoose";
import settings from "../settings";

export let connection: mongoose.Connection | null = null;

export const connect = async () => {
    try {
        await mongoose.connect(settings.mongoURI || "mongodb://localhost:27017/error");
        console.log("Mongo DB connected successfully");
        connection = mongoose.connection;
    } catch (err:any) {
        console.error("mongo connection error:" + err.message);
        throw new Error(err);
    }
};

