import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback="loading">
            <App />
        </Suspense>
    </React.StrictMode>,
    document.getElementById("root"),
);
