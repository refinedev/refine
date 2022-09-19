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
): JSX.Element {
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
): JSX.Element {
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
): JSX.Element {
    return (
        <HashRouter {...props}>
            <RouteProvider initialRoute={this.initialRoute} />
            {children}
        </HashRouter>
    );
}
