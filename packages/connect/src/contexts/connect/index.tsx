import React from "react";

import { IConnectContext } from "./IConnectContext";

export const ConnectContext = React.createContext<IConnectContext>({});

export const ConnectContextProvider: React.FC<
    IConnectContext & {
        children: React.ReactNode;
    }
> = ({ baseUrl, clientId, children }) => {
    return (
        <ConnectContext.Provider
            value={{
                baseUrl,
                clientId,
            }}
        >
            {children}
        </ConnectContext.Provider>
    );
};
