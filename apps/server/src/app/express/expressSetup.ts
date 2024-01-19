import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";
import api from "./api";
// eslint-disable-next-line @nx/enforce-module-boundaries
import pack from "../../../../../package.json";
import settings from "../../config";
import { generateTSFiles } from "swagger-ts-generator";

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
  //axiosLogger,
];

settings.whiteEnv !== "prod" &&
  swaggerAutogen({ openapi: "3.0.0" })(
    "./swagger-output.json",
    ["apps/server/src/app/express/api/index.ts"],
    {
      info: {
        title: "Offisito API",
      },
      host: "server.offisito.com or localhost...",
    },
  )
    .then((x) => {
      if (x) {
        app.use("/docs", swaggerUi.serve, swaggerUi.setup(x?.data));
        settings.whiteEnv === "local" &&
          generateTSFiles(
            x.data, // This can be either a file containing the Swagger json or the Swagger object itself
            {
              modelFolder: "libs/types/src/api/auto/models", // Adjust to your preferred models directory
              enumTSFile: "libs/types/src/api/auto/models/enums.ts", // Adjust to your preferred enums file location

              // + optionally more configuration
            },
          );
      }
    })
    .catch((error) => {
      console.error("Failed to load swagger document:", error);
    });

export default async () => {
  try {
    middlewares.forEach((middleware) => app.use(middleware));

    app.use("/api", api);

    const { version } = pack;

    app.get("/", (_, res) => {
      res.json({ status: "Im alive", version, whiteEnv: settings.whiteEnv });
    });

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is ready at ${"http://localhost"}:${port}`);
    });
  } catch (e) {
    throw new Error("Express setup failed: " + e);
  }
};
