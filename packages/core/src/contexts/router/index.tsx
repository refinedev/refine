import React from "react";

import { IRouterContext } from "../../interfaces";

export const defaultProvider: IRouterContext = {
    useHistory: () => false,
    useLocation: () => false,
    useParams: () => ({} as any),
    Prompt: () => null,
    Link: () => null,
};

export const RouterContext =
    React.createContext<IRouterContext>(defaultProvider);

export const RouterContextProvider: React.FC<IRouterContext> = ({
    children,
    useHistory,
    useLocation,
    useParams,
    Prompt,
    Link,
}) => {
    return (
        <RouterContext.Provider
            value={{
                useHistory,
                useLocation,
                useParams,
                Prompt,
                Link,
            }}
        >
            {children}
        </RouterContext.Provider>
    );
};
