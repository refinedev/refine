import React from "react";

import { IRouterContext } from "../../interfaces";

export const defaultProvider: IRouterContext = {
    useHistory: () => false,
    useLocation: () => false,
    useParams: () => ({} as any),
    BrowserRouter: null,
    Switch: null,
    Route: null,
    Prompt: null,
    Link: null,
    Redirect: null,
};

export const RouterContext =
    React.createContext<IRouterContext>(defaultProvider);

export const RouterContextProvider: React.FC<IRouterContext> = ({
    children,
    useHistory,
    useLocation,
    useParams,
    BrowserRouter,
    Switch,
    Route,
    Prompt,
    Link,
    Redirect,
}) => {
    return (
        <RouterContext.Provider
            value={{
                useHistory,
                useLocation,
                useParams,
                BrowserRouter,
                Switch,
                Route,
                Prompt,
                Link,
                Redirect,
            }}
        >
            {children}
        </RouterContext.Provider>
    );
};
