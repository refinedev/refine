import {
    DataProvider,
    LiveProvider,
    LiveEvent,
    CrudFilters,
    CrudSorting,
    CrudFilter,
    Pagination,
} from "@pankod/refine-core";
import {
    Client as Appwrite,
    Query,
    Databases,
    Permission,
    Role,
    ID,
} from "appwrite";

const getRefineEvent = (event: string): LiveEvent["type"] | undefined => {
    if (event.includes(".create")) {
        return "created";
    } else if (event.includes(".update")) {
        return "updated";
    } else if (event.includes(".delete")) {
        return "deleted";
    }

    return undefined;
};

type GetAppwriteFiltersType = {
    (filters?: CrudFilters): string[];
};

type GetAppwriteSortingType = {
    (sorts?: CrudSorting): string[];
};

const generateFilter = (filter: CrudFilter) => {
    switch (filter.operator) {
        case "eq":
            return Query.equal(filter.field, filter.value);
        case "ne":
            return Query.notEqual(filter.field, filter.value);
        case "gt":
            return Query.greaterThan(filter.field, filter.value);
        case "gte":
            return Query.greaterThanEqual(filter.field, filter.value);
        case "lt":
            return Query.lessThan(filter.field, filter.value);
        case "lte":
            return Query.lessThanEqual(filter.field, filter.value);
        case "contains":
            return Query.search(filter.field, `%${filter.value}%`);
        default:
            throw new Error(`Operator ${filter.operator} is not supported`);
    }
};

export const getAppwriteFilters: GetAppwriteFiltersType = (filters) => {
    const appwriteFilters: string[] = [];

    for (const filter of filters ?? []) {
        if (
            filter.operator !== "or" &&
            filter.operator !== "and" &&
            "field" in filter
        ) {
            const filterField = filter.field === "id" ? "$id" : filter.field;

            appwriteFilters.push(
                generateFilter({
                    ...filter,
                    field: filterField,
                }),
            );
        }
    }

    return appwriteFilters;
};

export const getAppwriteSorting: GetAppwriteSortingType = (sort) => {
    const sorts: string[] = [];

    if (sort) {
        sort.map((item) => {
            const field = item.field === "id" ? "$id" : item.field;
            if (item.order === "asc") {
                sorts.push(Query.orderAsc(field));
            } else {
                sorts.push(Query.orderDesc(field));
            }
        });
    }

    return sorts;
};

export const getAppwritePagination = (pagination: Pagination) => {
    const { current = 1, pageSize = 10 } = pagination ?? {};

    return [Query.offset((current - 1) * pageSize), Query.limit(pageSize)];
};

export const dataProvider = (
    appwriteClient: Appwrite,
    options: { databaseId: string } = { databaseId: "default" },
): Required<DataProvider> => {
    const { databaseId } = options;

    const database = new Databases(appwriteClient);

    return {
        getList: async ({
            resource,
            hasPagination = true,
            pagination = { current: 1, pageSize: 10 },
            filters,
            sort,
        }) => {
            const appwriteFilters = getAppwriteFilters(filters);
            const appwritePagination = hasPagination
                ? getAppwritePagination(pagination)
                : [];

            const appwriteSorts = getAppwriteSorting(sort);

            const { total: total, documents: data } =
                await database.listDocuments<any>(databaseId, resource, [
                    ...appwriteFilters,
                    ...appwritePagination,
                    ...appwriteSorts,
                ]);

            return {
                data: data.map(({ $id, ...restData }: { $id: string }) => ({
                    id: $id,
                    ...restData,
                })) as any,
                total,
            };
        },
        getOne: async ({ resource, id }) => {
            const { $id, ...restData } = await database.getDocument(
                databaseId,
                resource,
                id.toString(),
            );

            return {
                data: {
                    id: $id,
                    ...restData,
                },
            } as any;
        },
        update: async ({ resource, id, variables, metaData }) => {
            const permissions = [
                Permission.read(Role.any()),
                Permission.write(Role.any()),
                ...(metaData?.readPermissions ?? ""),
                ...(metaData?.writePermissions ?? ""),
            ];
            const { $id, ...restData } = await database.updateDocument(
                databaseId,
                resource,
                id.toString(),
                variables as any,
                permissions,
            );

            return {
                data: {
                    id: $id,
                    ...restData,
                },
            } as any;
        },
        create: async ({ resource, variables, metaData }) => {
            const permissions = [
                Permission.read(Role.any()),
                Permission.write(Role.any()),
                ...(metaData?.readPermissions ?? ""),
                ...(metaData?.writePermissions ?? ""),
            ];

            const { $id, ...restData } = await database.createDocument(
                databaseId,
                resource,
                metaData?.documentId ?? ID.unique(),
                variables as unknown as object,
                permissions,
            );

            return {
                data: {
                    id: $id,
                    ...restData,
                },
            } as any;
        },
        createMany: async ({ resource, variables, metaData }) => {
            const permissions = [
                Permission.read(Role.any()),
                Permission.write(Role.any()),
                ...(metaData?.readPermissions ?? ""),
                ...(metaData?.writePermissions ?? ""),
            ];
            const data = await Promise.all(
                variables.map((document) =>
                    database.createDocument<any>(
                        databaseId,
                        resource,
                        metaData?.documentId ?? ID.unique(),
                        document as unknown as any,
                        permissions,
                    ),
                ),
            );

            return {
                data: data.map(({ $id, ...restData }) => ({
                    id: $id,
                    ...restData,
                })),
            } as any;
        },
        deleteOne: async ({ resource, id }) => {
            await database.deleteDocument(databaseId, resource, id.toString());

            return {
                data: { id },
            } as any;
        },
        deleteMany: async ({ resource, ids }) => {
            await Promise.all(
                ids.map((id) =>
                    database.deleteDocument(
                        databaseId,
                        resource,
                        id.toString(),
                    ),
                ),
            );

            return {
                data: ids.map((id) => ({
                    id,
                })),
            } as any;
        },
        getMany: async ({ resource, ids }) => {
            const data = await Promise.all(
                ids.map((id) =>
                    database.getDocument<any>(
                        databaseId,
                        resource,
                        id.toString(),
                    ),
                ),
            );

            return {
                data: data.map(({ $id, ...restData }) => ({
                    id: $id,
                    ...restData,
                })),
            } as any;
        },
        updateMany: async ({ resource, ids, variables, metaData }) => {
            const permissions = [
                Permission.read(Role.any()),
                Permission.write(Role.any()),
                ...(metaData?.readPermissions ?? ""),
                ...(metaData?.writePermissions ?? ""),
            ];
            const data = await Promise.all(
                ids.map((id) =>
                    database.updateDocument<any>(
                        databaseId,
                        resource,
                        id.toString(),
                        variables as unknown as object,
                        permissions,
                    ),
                ),
            );

            return {
                data: data.map(({ $id, ...restData }) => ({
                    id: $id,
                    ...restData,
                })),
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

export const liveProvider = (
    appwriteClient: Appwrite,
    options: { databaseId: string } = { databaseId: "default" },
): LiveProvider => {
    const { databaseId } = options;
    return {
        subscribe: ({ channel, types, params, callback }): any => {
            const resource = channel.replace("resources/", "");

            let appwriteChannel;

            if (params?.ids) {
                appwriteChannel = params.ids.map(
                    (id) =>
                        `databases.${databaseId}.collections.${resource}.documents.${id}`,
                );
            } else {
                appwriteChannel = `databases.${databaseId}.collections.${resource}.documents`;
            }

            return appwriteClient.subscribe(appwriteChannel, (event) => {
                const refineEvent = getRefineEvent(event.events[0]);
                if (
                    types.includes("*") ||
                    (refineEvent && types.includes(refineEvent))
                ) {
                    callback({
                        channel,
                        type:
                            getRefineEvent(event.events[0]) ?? event.events[0],
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

export {
    Account,
    AppwriteException,
    Avatars,
    Client as Appwrite,
    Databases,
    Functions,
    Locale,
    Query,
    Storage,
    Teams,
    Permission,
    ID,
    Role,
} from "appwrite";

export type {
    Models,
    Payload,
    UploadProgress,
    QueryTypes,
    QueryTypesList,
    RealtimeResponseEvent,
} from "appwrite";
