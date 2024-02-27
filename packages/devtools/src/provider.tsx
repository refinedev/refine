import React from "react";
import { DevToolsContextProvider } from "@refinedev/devtools-shared";

export const DevtoolsProvider =
  __DEV_CONDITION__ !== "development"
    ? ({ children }: React.PropsWithChildren) => children as any
    : ({ children }: React.PropsWithChildren) => {
        return <DevToolsContextProvider>{children}</DevToolsContextProvider>;
      };
