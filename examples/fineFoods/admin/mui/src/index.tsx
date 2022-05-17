import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import "i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import App from "./App";

dayjs.extend(relativeTime);

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
