import { IQueryKeys } from "src/interfaces";
import { QueryKey } from "react-query";

import { MetaDataQuery } from "src/interfaces";

export const queryKeys = (
    resource?: string,
    dataProviderName?: string,
    metaData?: MetaDataQuery | undefined,
): IQueryKeys => {
    const providerName = dataProviderName || "default";
    const keys: IQueryKeys = {
        all: [providerName],
        resourceAll: [providerName, resource || ""],
        list: (config) => [
            ...keys.resourceAll,
            "list",
            { ...config, ...metaData } as QueryKey,
        ],
        many: (ids) =>
            [
                ...keys.resourceAll,
                "getMany",
                (ids && ids.map(String)) as QueryKey,
                { ...metaData } as QueryKey,
            ].filter((item) => item !== undefined),
        detail: (id) => [
            ...keys.resourceAll,
            "detail",
            id?.toString(),
            { ...metaData } as QueryKey,
        ],
    };
    return keys;
};
