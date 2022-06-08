import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import { styled } from "@pankod/refine-mui";

import App from "./App";

const StyledSnackbarProvider = styled(SnackbarProvider)`
    &.SnackbarItem-contentRoot {
        background-color: ${(props) => props.theme.palette.background.default};
        color: ${(props) => props.theme.palette.primary.main};
    }
    &.SnackbarItem-variantSuccess {
        background-color: ${(props) => props.theme.palette.primary.main};
        color: ${(props) => props.theme.palette.primary.contrastText};
    }
    &.SnackbarItem-variantError {
        background-color: ${(props) => props.theme.palette.error.main};
        color: ${(props) => props.theme.palette.common.white};
    }
`;

ReactDOM.render(
    <React.StrictMode>
        <StyledSnackbarProvider>
            <App />
        </StyledSnackbarProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
