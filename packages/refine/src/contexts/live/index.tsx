import React from "react";

import { ILiveContext, ILiveContextProvider } from "./ILiveContext";

export const LiveContext = React.createContext<ILiveContext>(undefined);

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
