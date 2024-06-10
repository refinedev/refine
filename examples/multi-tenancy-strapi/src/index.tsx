import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import { TenantProvider } from "@/providers/tenant";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
// eslint-disable-next-line
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TenantProvider>
        <App />
      </TenantProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
