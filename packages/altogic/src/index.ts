import axios, { AxiosInstance } from "axios";
import { stringify } from "query-string";
import {
    DataProvider,
    HttpError,
    CrudOperators,
    CrudFilters,
    CrudSorting,
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
        default:
            throw Error(`Operator ${operator} is not supported`);
    }
};

const generateSort = (sort?: CrudSorting) => {
    if (sort && sort.length > 0) {
        const _sort: string[] = [];

        sort.map((item) => {
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
        filters.map(({ field, operator, value }) => {
            const mappedOperator = mapOperator(operator);

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
        });
    }

    return { filter: queryFilters.join(" && ") };
};

const AltogicDataProvider = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async ({ resource, pagination, filters, sort }) => {
        const url = `${apiUrl}/${resource}`;

        // pagination
        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;

        const queryFilters = generateFilter(filters);

        const query: {
            page: number;
            size: number;
            sort?: string;
        } = {
            page: current,
            size: pageSize,
        };

        const generatedSort = generateSort(sort);
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

    custom: async ({ url, method, filters, sort, payload, query, headers }) => {
        let requestUrl = `${url}?`;

        if (sort) {
            const generatedSort = generateSort(sort);
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

export default AltogicDataProvider;
