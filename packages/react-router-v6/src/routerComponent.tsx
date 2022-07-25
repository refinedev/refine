import React from "react";
import {} from "react-router-dom";
import {
    BrowserRouter,
    BrowserRouterProps,
    MemoryRouter,
    MemoryRouterProps,
    HashRouter,
    HashRouterProps,
} from "react-router-dom";

import { RouteProvider } from "./routeProvider";

export const BrowserRouterComponent: React.FC<BrowserRouterProps> = ({
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

export const MemoryRouterComponent: React.FC<MemoryRouterProps> = ({
    children,
    ...props
}) => {
    return (
        <MemoryRouter {...props}>
            <RouteProvider />
            {children}
        </MemoryRouter>
    );
};

export const HashRouterComponent: React.FC<HashRouterProps> = ({
    children,
    ...props
}) => {
    return (
        <HashRouter {...props}>
            <RouteProvider />
            {children}
        </HashRouter>
    );
};
