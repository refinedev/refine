import { DataProvider, LiveProvider, LiveEvent } from "@pankod/refine";
import { CrudFilters, CrudSorting } from "@pankod/refine/dist/interfaces";
import { Appwrite } from "appwrite";

const operators = {
    eq: "=",
    ne: "!=",
    lt: "<",
    gt: ">",
    lte: "<=",
    gte: ">=",
    in: undefined,
    nin: undefined,
    contains: undefined,
    containss: undefined,
    ncontains: undefined,
    ncontainss: undefined,
    null: undefined,
};

const appwriteEventToRefineEvent = {
    "database.documents.create": "created",
    "database.documents.update": "updated",
    "database.documents.delete": "deleted",
} as const;

const getRefineEvent = (event: string): LiveEvent["type"] | undefined => {
    if (
        event === "database.documents.create" ||
        event === "database.documents.update" ||
        event === "database.documents.delete"
    ) {
        return appwriteEventToRefineEvent[event];
    }

    return undefined;
};

type GetAppwriteFiltersType = {
    (filters?: CrudFilters): string[] | undefined;
};

type GetAppwriteSortingType = {
    (filters?: CrudSorting): {
        orderField?: string;
        orderType?: string;
    };
};

export const getAppwriteFilters: GetAppwriteFiltersType = (filters) => {
    if (!filters) {
        return undefined;
    }

    const appwriteFilters: string[] = [];

    for (const filter of filters) {
        const operator = operators[filter.operator];

        if (!operator) {
            throw new Error(
                `Appwrite data provider does not support ${filter.operator} operator`,
            );
        }

        appwriteFilters.push(
            `${filter.field}${filter.operator}${filter.value}`,
        );
    }

    return appwriteFilters;
};

export const getAppwriteSorting: GetAppwriteSortingType = (sorting) => {
    if (!sorting) {
        return {
            orderField: undefined,
            orderType: undefined,
        };
    }

    if (sorting.length > 1) {
        throw new Error(
            "Appwrite data provider does not support multiple sortings",
        );
    }

    return {
        orderField: sorting?.[0]?.field,
        orderType: sorting?.[0]?.order.toUpperCase(),
    };
};

export const dataProvider = (appwriteClient: Appwrite): DataProvider => {
    return {
        getList: async ({ resource, pagination, filters, sort }) => {
            const current = pagination?.current ?? 1;
            const pageSize = pagination?.pageSize ?? 10;
            const appwriteFilters = getAppwriteFilters(filters);
            const { orderField, orderType } = getAppwriteSorting(sort);

            const { sum: total, documents: data } =
                await appwriteClient.database.listDocuments(
                    resource,
                    appwriteFilters,
                    pageSize,
                    (current - 1) * pageSize,
                    orderField,
                    orderType,
                );

            return {
                data,
                total,
            };
        },
        getOne: async ({ resource, id }) => {
            const data = await appwriteClient.database.getDocument(
                resource,
                id,
            );

            return {
                data,
            } as any;
        },
        update: async ({ resource, id, variables, metaData }) => {
            const data = await appwriteClient.database.updateDocument(
                resource,
                id,
                variables as any,
                metaData?.readPermissions ?? ["*"],
                metaData?.writePermissions ?? ["*"],
            );

            return {
                data,
            } as any;
        },
        create: async ({ resource, variables, metaData }) => {
            const data = await appwriteClient.database.createDocument(
                resource,
                variables as unknown as object,
                metaData?.readPermissions ?? ["*"],
                metaData?.writePermissions ?? ["*"],
            );

            return {
                data,
            } as any;
        },
        createMany: async ({ resource, variables, metaData }) => {
            const data = await Promise.all(
                variables.map((document) =>
                    appwriteClient.database.createDocument(
                        resource,
                        document as unknown as object,
                        metaData?.readPermissions ?? ["*"],
                        metaData?.writePermissions ?? ["*"],
                    ),
                ),
            );

            return {
                data,
            } as any;
        },
        deleteOne: async ({ resource, id }) => {
            const data = await appwriteClient.database.deleteDocument(
                resource,
                id,
            );

            return {
                data,
            } as any;
        },
        deleteMany: async ({ resource, ids }) => {
            const data = await Promise.all(
                ids.map((id) =>
                    appwriteClient.database.deleteDocument(resource, id),
                ),
            );

            return {
                data,
            } as any;
        },
        getMany: async ({ resource, ids }) => {
            const data = await Promise.all(
                ids.map((id) =>
                    appwriteClient.database.getDocument(resource, id),
                ),
            );

            return {
                data,
            } as any;
        },
        updateMany: async ({ resource, ids, variables, metaData }) => {
            const data = await Promise.all(
                ids.map((id) =>
                    appwriteClient.database.updateDocument(
                        resource,
                        id,
                        variables as unknown as object,
                        metaData?.readPermissions ?? ["*"],
                        metaData?.writePermissions ?? ["*"],
                    ),
                ),
            );

            return {
                data,
            } as any;
        },
        getApiUrl: () => {
            throw Error(
                "'getApiUrl' method is not implemented on refine-appwrite data provider.",
            );
        },
        custom: () => {
            throw Error(
                "'custom' method is not implemented on refine-appwrite data provider.",
            );
        },
    };
};

export const liveProvider = (appwriteClient: Appwrite): LiveProvider => {
    return {
        subscribe: ({ channel, types, params, callback }): any => {
            const resource = channel.replace("resources/", "");

            let appwriteChannel;

            if (params?.ids) {
                appwriteChannel = params?.ids?.map((id) => `documents.${id}`);
            } else {
                appwriteChannel = `collections.${resource}.documents`;
            }

            return appwriteClient.subscribe(appwriteChannel, (event) => {
                const refineEvent = getRefineEvent(event.event);
                if (
                    types.includes("*") ||
                    (refineEvent && types.includes(refineEvent))
                ) {
                    callback({
                        channel,
                        type: getRefineEvent(event.event) ?? event.event,
                        payload: event.payload as any,
                        date: new Date(event.timestamp * 1000),
                    });
                }
            });
        },

        unsubscribe: async (unsubscribe: () => void) => {
            unsubscribe();
        },
    };
};
