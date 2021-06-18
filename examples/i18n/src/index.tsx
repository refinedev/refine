import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback="loading">
            <App />
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById("root"),
);
