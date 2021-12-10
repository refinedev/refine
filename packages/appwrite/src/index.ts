import { DataProvider } from "@pankod/refine";
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

export const dataProvider = (
    appwriteClient: Appwrite,
): Partial<DataProvider> => {
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
        // create: async ({ resource, variables }) => {
        //     const { data } = await supabaseClient
        //         .from(resource)
        //         .insert(variables);
        //     return {
        //         data: (data || [])[0] as any,
        //     };
        // },
        // getMany: async ({ resource, ids }) => {
        //     const { data } = await supabaseClient
        //         .from(resource)
        //         .select("*")
        //         .in("id", ids);
        //     return {
        //         data: data || [],
        //     };
        // },
        // create: async ({ resource, variables }) => {
        //     const { data } = await supabaseClient
        //         .from(resource)
        //         .insert(variables);
        //     return {
        //         data: (data || [])[0] as any,
        //     };
        // },
        // createMany: async ({ resource, variables }) => {
        //     const { data } = await supabaseClient
        //         .from(resource)
        //         .insert(variables);
        //     return {
        //         data: data as any,
        //     };
        // },
        // update: async ({ resource, id, variables }) => {
        //     const { data } = await supabaseClient
        //         .from(resource)
        //         .update(variables)
        //         .match({ id });
        //     return {
        //         data: (data || [])[0] as any,
        //     };
        // },
        // updateMany: async ({ resource, ids, variables }) => {
        //     const response = await Promise.all(
        //         ids.map(async (id) => {
        //             const { data } = await supabaseClient
        //                 .from(resource)
        //                 .update(variables)
        //                 .match({ id });
        //             return (data || [])[0];
        //         }),
        //     );
        //     return {
        //         data: response,
        //     };
        // },
        // getOne: async ({ resource, id }) => {
        //     const { data } = await supabaseClient
        //         .from(resource)
        //         .select("*")
        //         .match({ id });
        //     return {
        //         data: (data || [])[0] as any,
        //     };
        // },
        // deleteOne: async ({ resource, id }) => {
        //     const { data } = await supabaseClient
        //         .from(resource)
        //         .delete()
        //         .match({ id });
        //     return {
        //         data: (data || [])[0] as any,
        //     };
        // },
        // deleteMany: async ({ resource, ids }) => {
        //     const response = await Promise.all(
        //         ids.map(async (id) => {
        //             const { data } = await supabaseClient
        //                 .from(resource)
        //                 .delete()
        //                 .match({ id });
        //             return (data || [])[0];
        //         }),
        //     );
        //     return {
        //         data: response,
        //     };
        // },
        // getApiUrl: () => {
        //     throw Error("Not implemented on refine-supabase data provider.");
        // },
        // custom: () => {
        //     throw Error("Not implemented on refine-supabase data provider.");
        // },
    };
};
