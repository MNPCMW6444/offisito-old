import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import api from "./api";
import pack from "../../../../../package.json";


const app = express();
const port = 5556;



const middlewares = [
    cookieParser(),
    express.json({limit: "50mb"}),
    express.urlencoded({limit: "50mb", extended: true}),
    cors({
        origin: ["https://failean.com", "https://scailean.com"],
        credentials: true,
    }),
    //axiosLogger,
];


export default async () => {
    try {
        middlewares.forEach((middleware) => app.use(middleware));

        app.use("/api", api);



        const {version} = pack;

        app.get("/", (_, res) => {
            res.json({status: "Im alive", version});
        });

        app.listen(port, "0.0.0.0", () => {
            console.log(
                `Server is ready at ${"http://localhost"}:${port}`
            );
        });

    } catch (e) {
        throw new Error("Express setup failed: " + e)
    }
}
