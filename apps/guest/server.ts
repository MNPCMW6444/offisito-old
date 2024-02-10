import { Request, Response } from "express";

const { manifest } = require("./pwa");
const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const indexPath = path.join(__dirname, "../../../guest/", "index.html");

app.use(
  express.static(path.join(__dirname, "../../../guest/"), { index: false }),
);

const envVars = {
  VITE_NODE_ENV: process.env.VITE_NODE_ENV || "production",
  VITE_WHITE_ENV: process.env.VITE_WHITE_ENV || "prod",
};

app.get("/manifest.json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify(
      manifest(envVars.VITE_WHITE_ENV === "preprod" ? "PreProd" : undefined),
    ),
  );
});

app.get("/icons/l144.png", (req: Request, res: Response) => {
  const imagePath = path.join(
    __dirname,
    "icons",
    envVars.VITE_WHITE_ENV === "prod" ? "" : envVars.VITE_WHITE_ENV,
    "l144.png",
  );
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.log(err);
      res.status(404).send("Image not found");
    }
  });
});

app.get("/icons/l512.png", (req: Request, res: Response) => {
  const imagePath = path.join(
    __dirname,
    "icons",
    envVars.VITE_WHITE_ENV === "prod" ? "" : envVars.VITE_WHITE_ENV,
    "l512.png",
  );
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.log(err);
      res.status(404).send("Image not found");
    }
  });
});

app.get("*", (req: Request, res: Response) => {
  fs.readFile(indexPath, "utf8", (err: any, htmlData: any) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(500).end();
    }

    const envVariables = JSON.stringify(envVars);

    const finalHtml = htmlData.replace("%ENV_VARIABLES%", envVariables);

    res.send(finalHtml);
  });
});

const port = 4100;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
