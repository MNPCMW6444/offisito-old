// eslint-disable-next-line @nx/enforce-module-boundaries
import { version } from "../../../../../package.json";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import api from "./api";
import settings from "../../config";
import { authRequester, serverErrorHandler } from "./middleware";

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

/*settings.whiteEnv !== "prod" &&
  swaggerAutogen({ openapi: "3.1.0" })(
    "swagger.json",
    ["apps/server/src/app/express/api/index.ts"],
    {
      info: {
        title: "Offisito API",
      },
      host: "localhost:5556/api",
    },
  )
    .then(
      (x) => x && app.use("/docs", swaggerUi.serve, swaggerUi.setup(x?.data)),
    )
    .catch((error) => {
      console.error("Failed to load swagger document:", error);
    });*/

export default async () => {
  console.log("Starting Server...");
  try {
    middlewares.forEach((middleware) => app.use(middleware));

    const handler = (_, res) => {
      res.json({
        status: "Im alive",
        version,
        whiteEnv: settings.whiteEnv,
      });
    };

    app.get("/", handler);
    app.get("/api", handler);

    app.use(authRequester);

    app.use("/api", api);

    app.use(serverErrorHandler);

    app.listen(port, "0.0.0.0", () =>
      console.log(
        "Server is ready at http" +
          (settings.whiteEnv === "local"
            ? "://localhost:" + port + "/"
            : "s://" +
              (settings.whiteEnv === "preprod" ? "pre" : "") +
              "server.offisito.com/"),
      ),
    );
  } catch (e) {
    throw new Error("Express setup failed: " + JSON.stringify(e));
  }
};
