import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import App from "./app/App";
import { createTheme, ThemeProvider } from "@mui/material";
import { themeForMVP } from "@monorepo/react-styles";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <StrictMode>
    <ThemeProvider theme={createTheme(themeForMVP)}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
