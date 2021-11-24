import React from "react";

import { ILiveModeContext, ILiveModeContextProvider } from "src/interfaces";
import { ILiveContext, ILiveContextProvider } from "./ILiveContext";

export const LiveContext = React.createContext<ILiveContext>(undefined);
export const LiveModeContext = React.createContext<ILiveModeContext>({
    liveMode: undefined,
    onLiveEvent: undefined,
});

export const LiveContextProvider: React.FC<ILiveContextProvider> = ({
    liveProvider,
    children,
}) => {
    return (
        <LiveContext.Provider value={liveProvider}>
            {children}
        </LiveContext.Provider>
    );
};

export const LiveModeContextProvider: React.FC<ILiveModeContextProvider> = ({
    liveMode,
    onLiveEvent,
    children,
}) => {
    return (
        <LiveModeContext.Provider
            value={{
                liveMode,
                onLiveEvent,
            }}
        >
            {children}
        </LiveModeContext.Provider>
    );
};
