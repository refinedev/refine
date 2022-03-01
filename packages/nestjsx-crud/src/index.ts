import axios, { AxiosInstance } from "axios";
import {
    QueryFilter,
    QueryFilterArr,
    QuerySort,
    QuerySortArr,
    QuerySortOperator,
    RequestQueryBuilder,
    CondOperator,
    ComparisonOperator,
} from "@nestjsx/crud-request";
import {
    DataProvider,
    HttpError,
    CrudFilters as RefineCrudFilter,
} from "@pankod/refine-core";
import {
    CrudOperators,
    CrudSorting,
} from "@pankod/refine-core/dist/interfaces";
import { stringify } from "query-string";

type SortBy = QuerySort | QuerySortArr | Array<QuerySort | QuerySortArr>;
type CrudFilters =
    | QueryFilter
    | QueryFilterArr
    | Array<QueryFilter | QueryFilterArr>;

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

const mapOperator = (operator: CrudOperators): ComparisonOperator => {
    switch (operator) {
        case "ne":
            return CondOperator.NOT_EQUALS;
        case "lt":
            return CondOperator.LOWER_THAN;
        case "gt":
            return CondOperator.GREATER_THAN;
        case "lte":
            return CondOperator.LOWER_THAN_EQUALS;
        case "gte":
            return CondOperator.GREATER_THAN_EQUALS;
        case "in":
            return CondOperator.IN;
        case "nin":
            return CondOperator.NOT_IN;
        case "contains":
            return CondOperator.CONTAINS_LOW;
        case "ncontains":
            return CondOperator.EXCLUDES_LOW;
        case "containss":
            return CondOperator.CONTAINS;
        case "ncontainss":
            return CondOperator.EXCLUDES;
        case "null":
            return CondOperator.IS_NULL;
    }

    return CondOperator.EQUALS;
};

const generateSort = (sort?: CrudSorting): SortBy | undefined => {
    if (sort && sort.length > 0) {
        const multipleSort: SortBy = [];
        sort.map(({ field, order }) => {
            if (field && order) {
                multipleSort.push({
                    field: field,
                    order: order.toUpperCase() as QuerySortOperator,
                });
            }
        });
        return multipleSort;
    }

    return;
};

const generateFilter = (filters?: RefineCrudFilter): CrudFilters => {
    const crudFilters: CrudFilters = [];
    if (filters) {
        filters.map(({ field, operator, value }) => {
            crudFilters.push({
                field,
                operator: mapOperator(operator),
                value,
            });
        });
    }

    return crudFilters;
};

const NestsxCrud = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async ({ resource, pagination, filters, sort }) => {
        const url = `${apiUrl}/${resource}`;
        const current = pagination?.current || 1;
        const pageSize = pagination?.pageSize || 10;

        const generetedFilters = generateFilter(filters);

        const query = RequestQueryBuilder.create()
            .setFilter(generetedFilters)
            .setLimit(pageSize)
            .setPage(current)
            .setOffset((current - 1) * pageSize);

        const sortBy = generateSort(sort);
        if (sortBy) {
            query.sortBy(sortBy);
        }

        const { data } = await httpClient.get(`${url}?${query.query()}`);

        return {
            data: data.data,
            total: data.total,
        };
    },

    getMany: async ({ resource, ids }) => {
        const url = `${apiUrl}/${resource}`;

        const query = RequestQueryBuilder.create()
            .setFilter({
                field: "id",
                operator: CondOperator.IN,
                value: ids,
            })
            .query();

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

    createMany: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}/bulk`;

        const { data } = await httpClient.post(url, { bulk: variables });

        return {
            data,
        };
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
        const requestQueryBuilder = RequestQueryBuilder.create().setFilter(
            generateFilter(filters),
        );

        const sortBy = generateSort(sort);
        if (sortBy) {
            requestQueryBuilder.sortBy(sortBy);
        }

        let requestUrl = `${url}?${requestQueryBuilder.query()}`;

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

export default NestsxCrud;
