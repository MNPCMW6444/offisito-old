import cors from "cors";
import cookieParser from "cookie-parser";
import routers from "./routers";
import pack from "../../package.json";
import express from "express";

const app = express();
const port = 5556;


const {
    authRouter,

} = routers;
/*const axiosLogger = (/!*req: Request, res: Response,*!/ next: NextFunction) => {
    next();
};*/

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

        app.use("/auth", authRouter);
        //  app.use("/analytics", settings.nodeEnv === "production" && process.env.WHITE_ENV === "prod" ? analyticsRouter : (_, res) => res.status(200).send());


        const {version} = pack;

        app.get("/areyoualive", (_, res) => {
            res.json({answer: "yes", version});
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