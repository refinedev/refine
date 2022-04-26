import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StylesProvider } from "@material-ui/styles";
import "@pankod/refine-mui/dist/styles.min.css";

ReactDOM.render(
    <React.StrictMode>
        <StylesProvider injectFirst>
            <App />
        </StylesProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
