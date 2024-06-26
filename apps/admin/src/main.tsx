import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import axios from "axios";
import { TODO } from "@offisito/shared";
import { AppContextProvider } from "@offisito/shared-react";

function loadGoogleFontsAsync() {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css?family=Roboto:400,700|Open+Sans:400,700|Inter:400,500,700&display=swap";
  link.rel = "stylesheet";

  document.head.appendChild(link);
}

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", loadGoogleFontsAsync);
} else {
  // `DOMContentLoaded` has already fired
  loadGoogleFontsAsync();
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) =>
      console.log("Service Worker registered with scope:", registration.scope),
    )
    .catch((error) =>
      console.log("Service Worker registration failed:", error),
    );
}

if ("serviceWorker" in navigator) {
  axios.get("/version").then((v) => {
    navigator.serviceWorker.ready.then((registration: TODO) => {
      registration.active.postMessage({
        action: "setVersion",
        version: v.data,
      });
    });
  });
}

root.render(
  <React.StrictMode>
    <AppContextProvider app="admin">
      <App />
    </AppContextProvider>
  </React.StrictMode>,
);
