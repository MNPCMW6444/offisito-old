import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeForMVP } from "@monorepo/shared";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme(themeForMVP)}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
