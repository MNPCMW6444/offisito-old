import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import router from "./routes/apiRouter";
import settings from "../config";
import path from "path";
import { serverErrorHandler } from "./middleware";
import notificationRuleModel from "../services/mongo/notifications/notificationRuleModel";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require(
  path.join(__dirname, "..", "..", "..", "package.json"),
);

const app = express();
const port = 5556;

const middlewares = [
  cookieParser(),
  express.json({ limit: "50mb" }),
  express.urlencoded({ limit: "50mb", extended: true }),
  cors({
    origin: Object.values(settings.clientDomains),
    credentials: true,
  }),
];

export default async () => {
  console.log("Starting Server...");
  try {
    middlewares.forEach((middleware) => app.use(middleware));

    const statusEndpointhandler = (_, res) => {
      res.json({
        status: "Im alive",
        version,
        whiteEnv: settings.whiteEnv,
      });
    };

    app.get("/", statusEndpointhandler);
    app.get("/api", statusEndpointhandler);

    app.use("/api", router);

    app.use(serverErrorHandler);

    app.listen(port, "0.0.0.0", () => {
      notificationRuleModel();
      const prefix = settings.whiteEnv === "preprod" ? "pre" : "";
      console.log(
        "Server is ready at http" +
          (settings.whiteEnv === "local"
            ? "://localhost:" + port + "/"
            : "s://" + prefix + "server.offisito.com/"),
      );
    });
  } catch (e) {
    throw new Error("Express setup failed: " + JSON.stringify(e));
  }
};
