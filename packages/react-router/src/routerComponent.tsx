import React from "react";
import { useWarnAboutChange } from "@pankod/refine-core";
import { BrowserRouter, BrowserRouterProps } from "react-router-dom";

import { RouteProvider } from "./routeProvider";

export const RouterComponent: React.FC<BrowserRouterProps> = ({
    children,
    ...props
}) => {
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
        <BrowserRouter getUserConfirmation={getUserConfirmation} {...props}>
            <RouteProvider />
            {children}
        </BrowserRouter>
    );
};
