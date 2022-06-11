import { useContext } from "react";
import { Client, createClient } from "@pankod/refine-sdk";

import { CloudContext } from "@contexts/cloud";

export type UseSdkPropsType = {};

// TODO: Add hook docs
export const useSdk = (): Client | undefined => {
    const { baseUrl, clientId } = useContext(CloudContext);

    if (baseUrl && clientId) {
        return createClient({
            baseUrl,
            clientId,
        });
    }

    return;
};
