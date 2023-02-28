import React from "react";

import { IRouterContext } from "../../interfaces";

export const defaultProvider: IRouterContext = {
    useHistory: () => false,
    useLocation: () => false,
    useParams: () => ({} as any),
    Prompt: () => null,
    Link: () => null,
};

export const LegacyRouterContext =
    React.createContext<IRouterContext>(defaultProvider);

export const RouterContext = LegacyRouterContext;

export const LegacyRouterContextProvider: React.FC<
    Partial<IRouterContext> & {
        children?: React.ReactNode;
    }
> = ({
    children,
    useHistory,
    useLocation,
    useParams,
    Prompt,
    Link,
    routes,
}) => {
    return (
        <RouterContext.Provider
            value={{
                useHistory: useHistory ?? defaultProvider.useHistory,
                useLocation: useLocation ?? defaultProvider.useLocation,
                useParams: useParams ?? defaultProvider.useParams,
                Prompt: Prompt ?? defaultProvider.Prompt,
                Link: Link ?? defaultProvider.Link,
                routes: routes ?? defaultProvider.routes,
            }}
        >
            {children}
        </RouterContext.Provider>
    );
};
