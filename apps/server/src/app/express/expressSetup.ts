import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";
import api from "./api";
// eslint-disable-next-line @nx/enforce-module-boundaries
import pack from "../../../../../package.json";
import settings from "../../config";

import path from "path";
import fs from "fs";

import { generateApi, generateTemplates } from "swagger-typescript-api";

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
  swaggerAutogen()(
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
        if (settings.whiteEnv === "local") {
          generateApi({
            name: "MySuperbApi.ts",
            // set to `false` to prevent the tool from writing to disk
            output: path.resolve(process.cwd(), "./src/__generated__"),
            url: "http://api.com/swagger.json",
            input: path.resolve(process.cwd(), "./foo/swagger.json"),
            lates: path.resolve(process.cwd(), "./api-templates"),
            httpClientType: "axios", // or "fetch"
            defaultResponseAsSuccess: false,
            generateClient: true,
            generateRouteTypes: false,
            generateResponses: true,
            toJS: false,
            extractRequestParams: false,
            extractRequestBody: false,
            extractEnums: false,
            unwrapResponseData: false,
            prettier: {
              // By default prettier config is load from your project
              printWidth: 120,
              tabWidth: 2,
              trailingComma: "all",
              parser: "typescript",
            },
            defaultResponseType: "void",
            singleHttpClient: true,
            cleanOutput: false,
            enumNamesAsValues: false,
            moduleNameFirstTag: false,
            generateUnionEnums: false,
            typePrefix: "",
            typeSuffix: "",
            enumKeyPrefix: "",
            enumKeySuffix: "",
            addReadonly: false,
            sortTypes: false,
            sortRouters: false,
            extractingOptions: {
              requestBodySuffix: ["Payload", "Body", "Input"],
              requestParamsSuffix: ["Params"],
              responseBodySuffix: ["Data", "Result", "Output"],
              responseErrorSuffix: [
                "Error",
                "Fail",
                "Fails",
                "ErrorData",
                "HttpError",
                "BadResponse",
              ],
            },
            /** allow to generate extra files based with this extra templates, see more below */
            extraTemplates: [],
            anotherArrayType: false,
            fixInvalidTypeNamePrefix: "Type",
          })
            .then(({ files, configuration }) => {
              files.forEach(({ content, name }) => {
                fs.writeFile(path, content);
              });
            })
            .catch((e) => console.error(e));

          generateTemplates({
            cleanOutput: false,
            output: PATH_TO_OUTPUT_DIR,
            httpClientType: "fetch",
            modular: false,
            silent: false,
            rewrite: false,
          });
        }
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
