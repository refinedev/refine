import React, { createContext } from "react";
import { KBarProvider, KBarProviderProps } from "kbar";

import { CommandBar } from "@components";

interface IKBarProviderProps extends KBarProviderProps {
    commandBarProps?: React.ComponentProps<typeof CommandBar>;
}

export const RefineKbarPropsContext = createContext<
    IKBarProviderProps["commandBarProps"]
>({});

export const RefineKbarProvider: React.FunctionComponent<
    IKBarProviderProps & { children: React.ReactNode }
> = ({ children, commandBarProps }) => {
    return (
        <RefineKbarPropsContext.Provider value={commandBarProps ?? {}}>
            <KBarProvider>{children}</KBarProvider>
        </RefineKbarPropsContext.Provider>
    );
};

export * from "kbar";

export { useRefineKbar } from "@hooks";
export { RefineKbar } from "@components";
