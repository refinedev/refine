import React, { type PropsWithChildren } from "react";

import type { ILegacyRouterContext } from "./types";

export const defaultProvider: ILegacyRouterContext = {
  useHistory: () => false,
  useLocation: () => false,
  useParams: () => ({}) as any,
  Prompt: () => null,
  Link: () => null,
};

export const LegacyRouterContext =
  React.createContext<ILegacyRouterContext>(defaultProvider);

export const LegacyRouterContextProvider: React.FC<
  PropsWithChildren<Partial<ILegacyRouterContext>>
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
    <LegacyRouterContext.Provider
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
    </LegacyRouterContext.Provider>
  );
};
