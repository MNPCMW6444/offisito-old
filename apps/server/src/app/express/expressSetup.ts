import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import api from "./api";
import settings from "../../config";
import swaggerAutogen from "swagger-autogen";
// eslint-disable-next-line @nx/enforce-module-boundaries
import pack from "../../../../../package.json";

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

settings.whiteEnv !== "prod" &&
  swaggerAutogen()(
    "swagger.json",
    ["apps/server/src/app/express/expressSetup.ts"],
    {
      info: {
        title: "Offisito API",
      },
      host: "localhost:5556/",
    },
  )
    .then(
      (x) => x && app.use("/docs", swaggerUi.serve, swaggerUi.setup(x?.data)),
    )
    .catch((error) => {
      console.error("Failed to load swagger document:", error);
    });

export default async () => {
  try {
    middlewares.forEach((middleware) => app.use(middleware));

    const handler = (_, res) => {
      res.json({
        status: "Im alive",
        version: pack.version,
        whiteEnv: settings.whiteEnv,
      });
    };

    app.get("/", handler);
    app.get("/api", handler);

    app.use("/api", api);

    app.listen(port, "0.0.0.0", () => {
      console.log(
        `Server is ready at http${settings.whiteEnv === "local" ? "://localhost:" + port + "/docs" : "s://" + settings.whiteEnv + "server.offisito.com" + settings.whiteEnv !== "prod" ? "/docs" : ""}`,
      );
    });
  } catch (e) {
    throw new Error("Express setup failed: " + e);
  }
};
