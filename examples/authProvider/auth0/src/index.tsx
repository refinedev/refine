import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain="refine.eu.auth0.com"
            clientId="zHwgQ2SoYUDQo3Ng1Bdtyk5eGoa2ad7X"
            redirectUri={window.location.origin}
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>,
);
