import React from "react";
import { createClient, Client } from "@pankod/refine-sdk";

import { ICloudContext, IContextContextProvider } from "./ICloudContext";

export const CloudContext = React.createContext<ICloudContext>(undefined);

export const CloudContextProvider: React.FC<IContextContextProvider> = ({
    cloudConfig,
    children,
}) => {
    let sdk: Client | undefined;

    if (cloudConfig && cloudConfig.baseUrl && cloudConfig.clientId) {
        const { baseUrl, clientId } = cloudConfig;
        sdk = createClient({
            baseUrl,
            clientId,
        });
    } else {
        console.warn("cloudConfig is not defined!");
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
