import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primeflex/primeflex.css";
import { MapProvider } from "react-map-gl";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <MapProvider>
        <App />
      </MapProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
);
