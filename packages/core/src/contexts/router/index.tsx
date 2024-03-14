import React, { createContext, PropsWithChildren } from "react";
import { IRouterContext } from "./types";

const defaultRouterProvider = {};

export const RouterContext = createContext<IRouterContext>(
  defaultRouterProvider,
);

export const RouterContextProvider: React.FC<
  PropsWithChildren<{ router?: IRouterContext }>
> = ({ children, router }) => {
  return (
    <RouterContext.Provider value={router ?? defaultRouterProvider}>
      {children}
    </RouterContext.Provider>
  );
};
