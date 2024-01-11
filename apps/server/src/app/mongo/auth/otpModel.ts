import {connection} from "../connection";
import mongoose from "mongoose";
import {versioning} from "@mnpcmw6444/mongoose-auto-versioning";






export default () => {

    const name = "otp"


    const otpModel = new mongoose.Schema(
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            otp: {
                type: Number,
                required: true,
            }
        },
        {
            timestamps: true,
        }
    ).plugin(versioning, {collection: name + "s.history", mongoose})


    if (!connection) throw new Error("Database not initialized");

    let otpModelR;
    if (mongoose.models.otp) {
        otpModelR = connection.model(name);
    } else {
        otpModelR = connection.model(name, otpModel);
    }

    return otpModelR// connection.model("otp", otpModel);
};
