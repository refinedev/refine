import { UseListConfig } from "@hooks/data/useList";
import { useCallback } from "react";

import { BaseKey, MetaDataQuery } from "src/interfaces";

export const queryKeys = (
    resource: string,
    dataProviderName?: string,
    metaData?: MetaDataQuery | undefined,
) => {
    const providerName = dataProviderName || "default";
    const keys = {
        all: [providerName],
        resourceAll: [providerName, resource],
        list: (config?: UseListConfig | undefined) => [
            providerName,
            resource,
            "list",
            { ...config, ...metaData },
        ],
        many: (ids?: BaseKey[]) => [
            providerName,
            resource,
            "getMany",
            ids?.map(String),
            { ...metaData },
        ],
        detail: (id: BaseKey) => [
            providerName,
            resource,
            "detail",
            id.toString(),
            { ...metaData },
        ],
    };
    return keys;
};
