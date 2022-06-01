import React from "react";
import { createClient, Client } from "@pankod/refine-sdk";

import { ICloudContext, IContextContextProvider } from "./ICloudContext";

export const CloudContext = React.createContext<ICloudContext>(undefined);

export const CloudContextProvider: React.FC<IContextContextProvider> = ({
    cloudConfig,
    children,
}) => {
    let sdk: Client | undefined = undefined;

    if (cloudConfig?.baseUrl && cloudConfig?.clientId) {
        const { baseUrl, clientId } = cloudConfig;
        sdk = createClient({
            baseUrl,
            clientId,
        });
    }

    return (
        <CloudContext.Provider
            value={{
                sdk,
            }}
        >
            {children}
        </CloudContext.Provider>
    );
};
