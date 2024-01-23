import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import App from "./app/App";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <StrictMode>
    <Toaster />

    <App />
  </StrictMode>,
);
