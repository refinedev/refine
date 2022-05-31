import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import "i18n";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { styled } from "@pankod/refine-mui";

import App from "./App";
import { ColorModeContextProvider } from "contexts";
dayjs.extend(relativeTime);

const StyledSnackbarProvider = styled(SnackbarProvider)`
    &.SnackbarItem-contentRoot {
        background-color: ${(props) => props.theme.palette.background.default};
        color: ${(props) => props.theme.palette.primary.main};
    }
    &.SnackbarItem-variantSuccess {
        background-color: ${(props) => props.theme.palette.primary.main};
        color: ${(props) => props.theme.palette.primary.contrastText}; s
    }
    &.SnackbarItem-variantError {
        background-color: ${(props) => props.theme.palette.error.main};
        color: ${(props) => props.theme.palette.common.white};
    }
`;

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback="loading">
            <ColorModeContextProvider>
                <StyledSnackbarProvider>
                    <App />
                </StyledSnackbarProvider>
            </ColorModeContextProvider>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById("root"),
);
