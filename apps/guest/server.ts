const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const indexPath = path.join(__dirname, "index.html");

// Serve static files but exclude index.html
app.use(express.static(path.join(__dirname), { index: false }));

app.get("*", (req, res) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(500).end();
    }

    // Define your environment variables here
    const envVariables = JSON.stringify({
      VITE_NODE_ENV: process.env.VITE_NODE_ENV || "production",
      VITE_WHITE_ENV: process.env.VITE_WHITE_ENV || "prod",
    });

    // Ensure the replacement string matches the placeholder in your HTML
    const finalHtml = htmlData.replace("%ENV_VARIABLES%", envVariables);

    // Serve the modified HTML
    res.send(finalHtml);
  });
});

const port = 4100;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
