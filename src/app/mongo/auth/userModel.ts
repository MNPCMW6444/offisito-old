import {connection} from "../connection";
import mongoose, {Model} from "mongoose"
import {versioning} from "@mnpcmw6444/mongoose-auto-versioning";


export default () => {

    const name = "user"
    const userModel = new mongoose.Schema(
        {
            phone: {
                type: String,
                unique: true,
            },
            email: {
                type: String,
                unique: true,
            },
            passwordHash: {type: String, required: false},
            name: {
                type: String,
                required: false,
            },
            type: {
                type: String, enum: ["admin", "host", "member"],
                required: true
            },
        },
        {
            timestamps: true,
        }
    ).plugin(versioning, {collection: name + "s.history", mongoose})


    if (!connection) throw new Error("Database not initialized");

    let userModelR: Model<any>;
    if (mongoose.models.user) {
        userModelR = connection.model(name);
    } else {
        userModelR = connection.model(name, userModel);
    }

    return userModelR;
};
