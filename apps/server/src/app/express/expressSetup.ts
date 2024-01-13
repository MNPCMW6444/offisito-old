import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerAutogen from "swagger-autogen";
import glob from "glob";
import api from "./api";
import pack from "../../../../../package.json";

const port = 5556;

const middlewares = [
  cookieParser(),
  express.json({ limit: "50mb" }),
  express.urlencoded({ limit: "50mb", extended: true }),
  cors({
    origin: ["https://failean.com", "https://scailean.com"],
    credentials: true,
  }),
  //axiosLogger,
];

const swaggerDoc = {
  info: {
    title: "Your API Title",
    description: "Description of your API",
  },
  host: `localhost:${port}`,
  schemes: ["http"],
};

// Glob pattern to match router files
const routerPattern = "./src/**/*.router.ts"; // Update this pattern to match your router files

export default async () => {
  try {
    const app = express();

    // Swagger Autogen setup
    const outputFile = "./swagger-output.json";
    const files = await new Promise((resolve, reject) => {
      (glob as any)(routerPattern, (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(files);
        }
      });
    });

    await swaggerAutogen()(outputFile, files, swaggerDoc);

    // Apply all middlewares
    middlewares.forEach((middleware) => app.use(middleware));

    // Swagger UI setup
    const swaggerData = require(outputFile);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerData));

    // Your API routes
    app.use("/api", api);

    const { version } = pack;
    app.get("/", (_, res) => {
      res.json({ status: "I'm alive", version });
    });

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is ready at http://localhost:${port}`);
    });
  } catch (e) {
    throw new Error("Express setup failed: " + e.message);
  }
};
