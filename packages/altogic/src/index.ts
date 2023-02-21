import axios, { AxiosInstance } from "axios";
import { stringify } from "query-string";
import {
    DataProvider,
    HttpError,
    CrudOperators,
    CrudFilters,
    CrudSorting,
    pickNotDeprecated,
} from "@pankod/refine-core";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    },
);

const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "eq":
            return "==";
        case "in":
            return `IN`;
        case "nin":
            return `NIN`;
        case "gt":
            return ">";
        case "lt":
            return "<";
        case "gte":
            return ">=";
        case "lte":
            return "<=";
        case "ne":
            return "!=";
        case "contains":
            return "IN";
        case "ncontains":
            return "NIN";
        default:
            throw Error(`Operator ${operator} is not supported`);
    }
};

const generateSort = (sorters?: CrudSorting) => {
    if (sorters && sorters.length > 0) {
        const _sort: string[] = [];

        sorters.map((item) => {
            _sort.push(`${item.field}:${item.order}`);
        });

        return {
            _sort,
        };
    }

    return;
};

const generateFilter = (filters?: CrudFilters) => {
    const queryFilters: string[] = [];
    if (filters) {
        filters.map((filter) => {
            const mappedOperator = mapOperator(filter.operator);

            if (
                filter.operator !== "or" &&
                filter.operator !== "and" &&
                "field" in filter
            ) {
                const { field, value } = filter;

                switch (mappedOperator) {
                    case "IN":
                    case "NIN":
                        queryFilters.push(
                            `${mappedOperator}(${JSON.stringify(
                                value,
                            )}, this.${field})`,
                        );
                        break;

                    default:
                        queryFilters.push(
                            `this.${field} ${mappedOperator} "${value}"`,
                        );
                }
            }
        });
    }

    return { filter: queryFilters.join(" && ") };
};

const AltogicDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): Required<DataProvider> => ({
    getList: async ({
        resource,
        hasPagination = true,
        pagination,
        filters,
        sort,
        sorters,
    }) => {
        // `pagination` has default values. However, it will be removed next major version
        const { current = 1, pageSize = 10, mode } = pagination ?? {};

        const url = `${apiUrl}/${resource}`;

        const queryFilters = generateFilter(filters);

        const query: {
            page?: number;
            size?: number;
            sort?: string;
        } = {};

        //`hasPagination` is deprecated with refine@4, refine will pass `pagination.mode` instead, however, we still support `hasPagination` for backward compatibility
        const hasPaginationString = hasPagination === false ? "off" : "server";
        const isServerPaginationEnabled =
            pickNotDeprecated(mode, hasPaginationString) === "server";

        if (isServerPaginationEnabled) {
            query.page = current;
            query.size = pageSize;
        }

        //`sort` is deprecated with refine@4, refine will pass `sorters` instead, however, we still support `sort` for backward compatibility
        const generatedSort = generateSort(pickNotDeprecated(sorters, sort));
        if (generatedSort) {
            const { _sort } = generatedSort;

            query.sort = _sort.length > 1 ? JSON.stringify(_sort) : _sort[0];
        }

        const { data } = await httpClient.get(
            `${url}?${stringify(query)}&${stringify(queryFilters)}`,
        );

        return {
            data: (data?.result || []).map((p: any) => ({ ...p, id: p._id })),
            total: data?.countInfo?.count,
        };
    },

    getMany: async ({ resource, ids }) => {
        const { data } = await httpClient.get(
            `${apiUrl}/${resource}?${stringify({ id: ids })}`,
        );

        return {
            data: (data || []).map((p: any) => ({ ...p, id: p._id })),
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

        const { data } = await httpClient.put(url, variables);

        return {
            data,
        };
    },

    updateMany: async ({ resource, ids, variables }) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.put(
                    `${apiUrl}/${resource}/${id}`,
                    variables,
                );
                return data;
            }),
        );

        return { data: response };
    },

    getOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.get(url);

        return {
            data,
        };
    },

    deleteOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url);

        return {
            data,
        };
    },

    deleteMany: async ({ resource, ids }) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.delete(
                    `${apiUrl}/${resource}/${id}`,
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
        sorters,
        payload,
        query,
        headers,
    }) => {
        let requestUrl = `${url}?`;

        if (sorters || sort) {
            //`sort` is deprecated with refine@4, refine will pass `sorters` instead, however, we still support `sort` for backward compatibility
            const generatedSort = generateSort(
                pickNotDeprecated(sorters, sort),
            );
            if (generatedSort) {
                const { _sort } = generatedSort;
                const sortQuery = {
                    _sort: _sort.join(","),
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
                axiosResponse = await httpClient.delete(url, {
                    data: payload,
                });
                break;
            default:
                axiosResponse = await httpClient.get(requestUrl);
                break;
        }

        const { data } = axiosResponse;

        return Promise.resolve({ data });
    },
});

export default AltogicDataProvider;
