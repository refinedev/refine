import React from "react";
import { useWarnAboutChange } from "@pankod/refine";
import { BrowserRouter } from "react-router-dom";

import { RouteProvider } from "./routeProvider";

export const RouterComponent: React.FC = ({ children }) => {
    const { setWarnWhen } = useWarnAboutChange();

    const getUserConfirmation: (
        message: string,
        callback: (ok: boolean) => void,
    ) => void = (message, callback) => {
        const allowTransition = window.confirm(message);
        if (allowTransition) {
            setWarnWhen(false);
        }
        callback(allowTransition);
    };
    return (
        <BrowserRouter getUserConfirmation={getUserConfirmation}>
            <RouteProvider />
            {children}
        </BrowserRouter>
    );
};
