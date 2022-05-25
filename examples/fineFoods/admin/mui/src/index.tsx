import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import "i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import App from "./App";
import { ColorModeContextProvider } from "contexts";

dayjs.extend(relativeTime);

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback="loading">
            <ColorModeContextProvider>
                <SnackbarProvider>
                    <App />
                </SnackbarProvider>
            </ColorModeContextProvider>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById("root"),
);
