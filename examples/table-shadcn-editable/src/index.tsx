// @ts-nocheck — suppresses React 19 JSX type mismatches
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root") as HTMLElement;
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
