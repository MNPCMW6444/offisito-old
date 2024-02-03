const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static(path.join(__dirname, ""))); // Assuming your static files are in a '' directory

app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "", "index.html");
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }

    // Here you define your environment variables
    const envVariables = JSON.stringify({
      VITE_NODE_ENV: process.env.VITE_NODE_ENV || "production",
      VITE_WHITE_ENV: process.env.VITE_WHITE_ENV || "prod",
    });

    // Replace the placeholder with actual environment variables
    const finalHtml = htmlData.replace("%ENV_VARIABLES%", envVariables);

    res.send(finalHtml);
  });
});

const port = 4100;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
