import React, { PropsWithChildren } from "react";

import { ILiveContext } from "./types";

export const LiveContext = React.createContext<ILiveContext>({});

export const LiveContextProvider: React.FC<PropsWithChildren<ILiveContext>> = ({
  liveProvider,
  children,
}) => {
  return (
    <LiveContext.Provider value={{ liveProvider }}>
      {children}
    </LiveContext.Provider>
  );
};
