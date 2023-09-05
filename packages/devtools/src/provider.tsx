import React from "react";
import { DevToolsContextProvider } from "@refinedev/devtools-shared";

export const DevtoolsProvider = ({ children }: React.PropsWithChildren) => {
    return <DevToolsContextProvider>{children}</DevToolsContextProvider>;
};
