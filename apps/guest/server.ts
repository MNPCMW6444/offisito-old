const express = require("express");
const path = require("path");
const fs = require("fs");
// Assuming you're using dotenv to manage your environment variables
require("dotenv").config();

const app = express();

app.use(express.static(path.join(__dirname, "")));

app.get("*", (_, res) => {
  const indexPath = path.join(__dirname, "", "index.html");
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error reading HTML file:", err);
      return res.status(500).send("Server error");
    }

    // Prepare environment variables to inject
    const envVariables = {
      VITE_WHITE_ENV: process.env.VITE_WHITE_ENV || "prod",
      VITE_NODE_ENV: process.env.VITE_NODE_ENV || "production",
    };

    // Replace the placeholder script with actual environment variables
    const replacedHtmlData = htmlData.replace(
      "<script>window.env = {};</script>",
      `<script>window.env = ${JSON.stringify(envVariables)};</script>`,
    );

    res.send(replacedHtmlData);
  });
});

const port = 4100;
app.listen(port, "0.0.0.0", () => {
  console.log(`App is listening on port ${port}`);
});
