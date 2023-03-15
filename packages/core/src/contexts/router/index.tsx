import React, { createContext, PropsWithChildren } from "react";
import { RouterBindings } from "src/interfaces";

const defaultBindings = {};

export const RouterBindingsContext =
    createContext<RouterBindings>(defaultBindings);

export const RouterBindingsProvider: React.FC<
    PropsWithChildren<{ router?: RouterBindings }>
> = ({ children, router }) => {
    return (
        <RouterBindingsContext.Provider value={router ?? defaultBindings}>
            {children}
        </RouterBindingsContext.Provider>
    );
};
