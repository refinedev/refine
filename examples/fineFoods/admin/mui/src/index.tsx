import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";

import "i18n";

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback="loading">
            <SnackbarProvider>
                <App />
            </SnackbarProvider>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById("root"),
);
