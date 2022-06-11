import { useContext } from "react";
import { Client, createClient } from "@pankod/refine-sdk";

import { CloudContext } from "@contexts/cloud";

export type UseSdkPropsType = {};

// TODO: Add hook docs
export const useSdk = (): Client => {
    const { baseUrl, clientId } = useContext(CloudContext);

    if (!baseUrl || !clientId) {
        // TODO: Need a better error message
        throw Error("baseUrl and clientId are required");
    }

    return createClient({
        baseUrl,
        clientId,
    });
};
