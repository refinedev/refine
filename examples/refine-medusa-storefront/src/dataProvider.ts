import { stringify } from "query-string";
import {
    DataProvider,
    CrudOperators,
    CrudFilters,
    CrudSorting,
} from "@pankod/refine-core";

import { getMedusaClient } from "./medusaClient";

const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "ne":
        case "gte":
        case "lte":
            return `_${operator}`;
        case "contains":
            return "_like";
        case "eq":
        default:
            return "";
    }
};

const generateSort = (sort?: CrudSorting) => {
    if (sort && sort.length > 0) {
        const _sort: string[] = [];
        const _order: string[] = [];

        sort.map((item) => {
            _sort.push(item.field);
            _order.push(item.order);
        });

        return {
            _sort,
            _order,
        };
    }

    return;
};

const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: { [key: string]: string } = {};
    if (filters) {
        filters.map((filter) => {
            if (filter.operator !== "or") {
                const { field, operator, value } = filter;

                if (field === "q") {
                    queryFilters[field] = value;
                    return;
                }

                const mappedOperator = mapOperator(operator);
                queryFilters[`${field}${mappedOperator}`] = value;
            }
        });
    }

    return queryFilters;
};

const JsonServer = (apiUrl: string): DataProvider => {
    const medusaClient = getMedusaClient(apiUrl);

    // fake client
    const httpClient = {
        get: async (url: string) => {
            const data = null;
            return data;
        },
        post: async (url: string, data: any) => {
            return data;
        },
        put: async (url: string, data: any) => {
            return data;
        },
        delete: async (url: string, variables?: any) => {
            const data: any = [];
            return data;
        },
        patch: async (url: string, data: any) => {
            return data;
        },
        defaults: {
            headers: {},
        },
    };

    return {
        getList: async ({
            resource,
            hasPagination = true,
            pagination = { current: 1, pageSize: 10 },
            metaData,
        }) => {
            const { current = 1, pageSize = 3 } = pagination ?? {};

            const searchQuery = metaData?.query;
            const collectionIds = metaData?.collectionIds;

            const query: {
                limit?: number;
                offset?: number;
                q?: string;
                tags?: string[];
                collection_id?: string[];
            } = {
                collection_id: collectionIds,
                q: searchQuery,
                tags: metaData?.tags,
                ...(hasPagination
                    ? {
                          offset: (current - 1) * pageSize,
                          limit: pageSize,
                      }
                    : {}),
            };

            let resourceList: any[] = [];
            let count = 0;

            switch (resource) {
                case `products`:
                    const response = await await medusaClient.products
                        .list(query)
                        .then((res) => res)
                        .catch((error) => {
                            throw new Error(error);
                        });
                    resourceList = response.products;
                    count = response.count;
                    break;
                case `collections`:
                    resourceList = await (
                        await medusaClient.collections
                            .list(query)
                            .then((res) => res)
                            .catch((error) => {
                                throw new Error(error);
                            })
                    ).collections;
                default:
                    break;
            }

            return {
                data: resourceList,
                total: count,
            };
        },

        getMany: async ({ resource, ids }) => {
            const data: any[] = [];

            return {
                data,
            };
        },

        create: async ({ resource, variables }) => {
            const url = `${apiUrl}/${resource}`;

            const { data } = await httpClient.post(url, variables);

            return {
                data,
            };
        },

        createMany: async ({ resource, variables }) => {
            const response = await Promise.all(
                variables.map(async (param) => {
                    const { data } = await httpClient.post(
                        `${apiUrl}/${resource}`,
                        param,
                    );
                    return data;
                }),
            );

            return { data: response };
        },

        update: async ({ resource, id, variables }) => {
            const url = `${apiUrl}/${resource}/${id}`;

            const { data } = await httpClient.patch(url, variables);

            return {
                data,
            };
        },

        updateMany: async ({ resource, ids, variables }) => {
            const response = await Promise.all(
                ids.map(async (id) => {
                    const { data } = await httpClient.patch(
                        `${apiUrl}/${resource}/${id}`,
                        variables,
                    );
                    return data;
                }),
            );

            return { data: response };
        },

        getOne: async ({ resource, id }) => {
            const { products } = await medusaClient.products.list({
                id: id.toString(),
            });

            console.log(`productsDataProvider`, products);

            return {
                data: products[0] as any,
            };
        },

        deleteOne: async ({ resource, id, variables }) => {
            const url = `${apiUrl}/${resource}/${id}`;

            const { data } = await httpClient.delete(url, variables);

            return {
                data,
            };
        },

        deleteMany: async ({ resource, ids, variables }) => {
            const response = await Promise.all(
                ids.map(async (id) => {
                    const { data } = await httpClient.delete(
                        `${apiUrl}/${resource}/${id}`,
                        variables,
                    );
                    return data;
                }),
            );
            return { data: response };
        },

        getApiUrl: () => {
            return apiUrl;
        },

        custom: async ({
            url,
            method,
            filters,
            sort,
            payload,
            query,
            headers,
        }) => {
            let requestUrl = `${url}?`;

            if (sort) {
                const generatedSort = generateSort(sort);
                if (generatedSort) {
                    const { _sort, _order } = generatedSort;
                    const sortQuery = {
                        _sort: _sort.join(","),
                        _order: _order.join(","),
                    };
                    requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
                }
            }

            if (filters) {
                const filterQuery = generateFilter(filters);
                requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
            }

            if (query) {
                requestUrl = `${requestUrl}&${stringify(query)}`;
            }

            if (headers) {
                httpClient.defaults.headers = {
                    ...httpClient.defaults.headers,
                    ...headers,
                };
            }

            let axiosResponse;
            switch (method) {
                case "put":
                case "post":
                case "patch":
                    axiosResponse = await httpClient[method](url, payload);
                    break;
                case "delete":
                    axiosResponse = await httpClient.delete(url);
                    break;
                default:
                    axiosResponse = await httpClient.get(requestUrl);
                    break;
            }

            const { data } = axiosResponse;

            return Promise.resolve({ data });
        },
    };
};

export default JsonServer;
