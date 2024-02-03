const express = require("express");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const app = express();

app.use(express.static(path.join(__dirname, "")));

app.get("*", (_, res) => {
  const indexPath = path.join(__dirname, "", "index.html");
  let indexHTML = fs.readFileSync(indexPath, "utf8");

  // Assuming you want to pass process.env.API_URL to the frontend
  const envVariables = { API_URL: process.env.API_URL };
  const envScript = `<script>window.env = ${JSON.stringify(envVariables)};</script>`;

  // Replace the placeholder with actual env variables
  indexHTML = indexHTML.replace("<script>window.env = {};</script>", envScript);

  res.send(indexHTML);
});

const port = 4100;
app.listen(port, "0.0.0.0");

console.log("App is listening on port " + port);
