import React, { createContext } from "react";
import { KBarProvider, KBarProviderProps } from "kbar";

import { CommandBar } from "@components";

interface IKBarProviderProps extends KBarProviderProps {
    commandBarProps?: React.ComponentProps<typeof CommandBar>;
}

export const RefineKbarPropsContext = createContext<
    IKBarProviderProps["commandBarProps"]
>({});

export const RefineKbarProvider: React.FunctionComponent<IKBarProviderProps> =
    ({ children, commandBarProps }) => {
        return (
            <RefineKbarPropsContext.Provider value={commandBarProps ?? {}}>
                <KBarProvider>{children}</KBarProvider>
            </RefineKbarPropsContext.Provider>
        );
    };

export {
    ActionGroup,
    Action,
    ActionId,
    ActionImpl,
    ActionInterface,
    ActionSection,
    ActionStore,
    ActionTree,
    History,
    HistoryItem,
    IKBarContext,
    KBAR_LISTBOX,
    KBarAnimator,
    KBarContext,
    KBarOptions,
    KBarPortal,
    KBarPositioner,
    KBarProvider,
    KBarProviderProps,
    KBarQuery,
    KBarResults,
    KBarSearch,
    KBarState,
    NO_GROUP,
    Priority,
    VisualState,
    createAction,
    getListboxItemId,
    useKBar,
    useMatches,
    useRegisterActions,
} from "kbar";

export { useRefineKbarActions, useRefineKbar } from "@hooks";
export { RefineKbar } from "@components";
