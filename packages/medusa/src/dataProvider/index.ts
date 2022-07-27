import axios, { AxiosInstance } from "axios";
import { stringify, StringifyOptions } from "query-string";
import {
    DataProvider,
    HttpError,
    CrudOperators,
    CrudFilter,
} from "@pankod/refine-core";

const mapOperator = (operator: CrudOperators): string => {
    switch (operator) {
        case "eq":
            return "";
        default:
            throw Error(
                `Operator ${operator} is not supported for the Medusa data provider`,
            );
    }
};

const generateFilter = (filters?: CrudFilter[]) => {
    const queryFilters: { [key: string]: string } = {};
    if (filters) {
        filters.map((filter: CrudFilter) => {
            if (filter.operator !== "or") {
                const { field, operator, value } = filter;

                const mappedOperator = mapOperator(operator);
                queryFilters[`${field}${mappedOperator}`] = value;
            }
        });
    }

    return queryFilters;
};

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    },
);

const DataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => {
    httpClient.defaults.baseURL = `${apiUrl}/store`;

    return {
        getList: async ({
            resource,
            hasPagination = true,
            pagination = { current: 1, pageSize: 10 },
            filters,
        }) => {
            const url = `${apiUrl}/${resource}`;
            const { current = 1, pageSize = 3 } = pagination ?? {};

            const queryFilters = generateFilter(filters);

            const stringifyConfig: StringifyOptions = {
                arrayFormat: "bracket",
            };

            const query: {
                limit?: number;
                offset?: number;
            } = {
                ...(hasPagination
                    ? {
                          offset: (current - 1) * pageSize,
                          limit: pageSize,
                      }
                    : {}),
            };

            const { data } = await httpClient.get(
                `${url}?${stringify(query, stringifyConfig)}&${stringify(
                    queryFilters,
                    stringifyConfig,
                )}`,
            );

            return {
                data: data[resource],
                total: data.count,
            };
        },

        getMany: async ({ resource, ids }) => {
            const { data } = await httpClient.get(
                `${apiUrl}/${resource}?${stringify({ id: ids })}`,
            );

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

            const { data } = await httpClient.post(url, variables);

            return {
                data,
            };
        },

        updateMany: async ({ resource, ids, variables }) => {
            const response = await Promise.all(
                ids.map(async (id) => {
                    const { data } = await httpClient.post(
                        `${apiUrl}/${resource}/${id}`,
                        variables,
                    );
                    return data;
                }),
            );

            return { data: response };
        },

        getOne: async ({ resource, id }) => {
            const { data } = await httpClient.get(
                `${apiUrl}/${resource}/${id}`,
            );

            return {
                data,
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

        custom: async ({ url, method, payload, query, headers, filters }) => {
            let requestUrl = `${url}?`;

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

export default DataProvider;
