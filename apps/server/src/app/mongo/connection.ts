import mongoose from "mongoose";
import settings from "../../config";

export let connection: mongoose.Connection | null = null;

export const connect = async () => {
    try {
        await mongoose.connect(settings.mongoURI || "mongodb://localhost:27017/error");
        console.log("Mongo DB connected successfully");
        connection = mongoose.connection;
    } catch (err) {
        console.error("mongo connection error:" + err.message);
        throw new Error(err);
    }
};


// export const connect = async (mongoURI?: string) => {
//     try {
//         if (!mongoURI) {
//             // If mongoURI is not provided, use a default URI or log a warning.
//             console.warn('No mongoURI provided. Using default URI or provide a valid mongoURI.');
//             mongoURI = "mongodb://localhost:27017/default";
//         }

//         if (connection) {
//             // If connection already exists, log a warning and return the existing connection.
//             console.warn('MongoDB is already connected. Returning existing connection.');
//             return connection;
//         }

//         await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log("Mongo DB connected successfully");
//         connection = mongoose.connection;

//         return connection;
//     } catch (err) {
//         console.error("Mongo connection error:", err.message);
//         throw new Error(err);
//     }
// };