import axios, { AxiosInstance } from "axios";
import {
    DataProvider as IDataProvider,
    HttpError,
    CrudFilters,
    CrudSorting,
    BaseKey,
} from "@pankod/refine-core";
import { stringify } from "query-string";

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

const generateSort = (sort?: CrudSorting) => {
    const _sort: string[] = [];

    if (sort) {
        sort.map((item) => {
            if (item.order) {
                _sort.push(`${item.field}:${item.order}`);
            }
        });
    }

    return _sort;
};

const generateFilter = (filters?: CrudFilters) => {
    let rawQuery = "";

    if (filters) {
        filters.map((filter) => {
            if (filter.operator !== "or") {
                const { field, operator, value } = filter;

                if (operator === "eq") {
                    rawQuery += `&${field}=${value}`;
                } else {
                    if (Array.isArray(value)) {
                        value.map((val) => {
                            rawQuery += `&[${field}_${operator}]=${val}`;
                        });
                    } else {
                        rawQuery += `&[${field}_${operator}]=${value}`;
                    }
                }
            } else {
                const { value } = filter;

                value.map((item, index) => {
                    const { field, operator, value } = item;

                    rawQuery += `&_where[_or][${index}][${field}_${operator}]=${value}`;
                });
            }
        });
    }

    return rawQuery;
};

export const DataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): IDataProvider => ({
    getList: async ({
        resource,
        hasPagination = true,
        pagination = {
            current: 1,
            pageSize: 10,
        },
        filters,
        sort,
    }) => {
        const url = `${apiUrl}/${resource}`;

        const { current = 1, pageSize: _limit = 10 } = pagination ?? {};

        const _sort = generateSort(sort);
        const queryFilters = generateFilter(filters);

        const query = {
            ...(hasPagination
                ? {
                      _start: (current - 1) * _limit,
                      _limit,
                  }
                : {}),
            _sort: _sort.length > 0 ? _sort.join(",") : undefined,
        };

        const response = await Promise.all([
            httpClient.get(`${url}?${stringify(query)}&${queryFilters}`),
            httpClient.get(`${url}/count?${queryFilters}`),
        ]);

        return {
            data: response[0].data,
            total: response[1].data,
        };
    },

    getMany: async ({ resource, ids }) => {
        const url = `${apiUrl}/${resource}`;

        const query = ids.map((item: BaseKey) => `id_in=${item}`).join("&");

        const { data } = await httpClient.get(`${url}?${query}`);

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

    createMany: async () => {
        throw new Error("createMany not implemented");
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

    custom: async ({ url, method, filters, sort, payload, query, headers }) => {
        let requestUrl = `${url}?`;

        if (sort) {
            const sortQuery = generateSort(sort);
            if (sortQuery.length > 0) {
                requestUrl = `${requestUrl}&${stringify({
                    _sort: sortQuery.join(","),
                })}`;
            }
        }

        if (filters) {
            const filterQuery = generateFilter(filters);
            requestUrl = `${requestUrl}&${filterQuery}`;
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
});
