import React from "react";
import {
    BrowserRouter,
    BrowserRouterProps,
    MemoryRouter,
    MemoryRouterProps,
    HashRouter,
    HashRouterProps,
} from "react-router-dom";

import { RouteProvider } from "./routeProvider";

export function BrowserRouterComponent(
    this: { initialRoute?: string },
    { children, ...props }: BrowserRouterProps,
): React.ReactNode {
    return (
        <BrowserRouter {...props}>
            <RouteProvider initialRoute={this.initialRoute} />
            {children}
        </BrowserRouter>
    );
}

export function MemoryRouterComponent(
    this: { initialRoute?: string },
    { children, ...props }: MemoryRouterProps,
): React.ReactNode {
    return (
        <MemoryRouter {...props}>
            <RouteProvider initialRoute={this.initialRoute} />
            {children}
        </MemoryRouter>
    );
}

export function HashRouterComponent(
    this: { initialRoute?: string },
    { children, ...props }: HashRouterProps,
): React.ReactNode {
    return (
        <HashRouter {...props}>
            <RouteProvider initialRoute={this.initialRoute} />
            {children}
        </HashRouter>
    );
}
