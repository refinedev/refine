import React from "react";
import ReactDOM from "react-dom";
import "i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import App from "./App";
dayjs.extend(relativeTime);

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback="loading">
            <App />
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById("root"),
);
