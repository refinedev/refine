import { IQueryKeys } from "src/interfaces";
import { QueryKey } from "@tanstack/react-query";

import { MetaQuery } from "src/interfaces";
import { pickNotDeprecated } from "../pickNotDeprecated";

export const queryKeys = (
    resource?: string,
    dataProviderName?: string,
    meta?: MetaQuery,
    /**
     * @deprecated `metaData` is deprecated with refine@4, refine will pass `meta` instead, however, we still support `metaData` for backward compatibility.
     */
    metaData?: MetaQuery | undefined,
): IQueryKeys => {
    const providerName = dataProviderName || "default";
    const keys: IQueryKeys = {
        all: [providerName],
        resourceAll: [providerName, resource || ""],
        list: (config) => [
            ...keys.resourceAll,
            "list",
            {
                ...config,
                ...(pickNotDeprecated(meta, metaData) || {}),
            } as QueryKey,
        ],
        many: (ids) =>
            [
                ...keys.resourceAll,
                "getMany",
                (ids && ids.map(String)) as QueryKey,
                { ...(pickNotDeprecated(meta, metaData) || {}) } as QueryKey,
            ].filter((item) => item !== undefined),
        detail: (id) => [
            ...keys.resourceAll,
            "detail",
            id?.toString(),
            { ...(pickNotDeprecated(meta, metaData) || {}) } as QueryKey,
        ],
        logList: (meta) =>
            ["logList", resource, meta as any, metaData as QueryKey].filter(
                (item) => item !== undefined,
            ),
    };
    return keys;
};
