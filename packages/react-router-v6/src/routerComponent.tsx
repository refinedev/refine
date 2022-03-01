import React from "react";
import { BrowserRouter, BrowserRouterProps } from "react-router-dom";

import { RouteProvider } from "./routeProvider";

export const RouterComponent: React.FC<BrowserRouterProps> = ({
    children,
    ...props
}) => {
    return (
        <BrowserRouter {...props}>
            <RouteProvider />
            {children}
        </BrowserRouter>
    );
};
