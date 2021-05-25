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
    Sort,
    CrudFilters as RefineCrudFilter,
} from "@pankod/refine";
import { CrudOperators } from "@pankod/refine/dist/interfaces";
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

const generateSort = (sort?: Sort): SortBy => {
    let sortBy: SortBy = { field: "id", order: "DESC" };
    if (sort) {
        if (Array.isArray(sort)) {
            const multipleSort: SortBy = [];
            sort.map(({ field, order }) => {
                if (field && order) {
                    multipleSort.push({
                        field: field as string,
                        order: order
                            .replace("end", "")
                            .toUpperCase() as QuerySortOperator,
                    });
                }
            });
            sortBy = multipleSort;
        } else {
            const { field, order } = sort;

            if (field && order) {
                sortBy = [
                    {
                        field: field as string,
                        order: order
                            .replace("end", "")
                            .toUpperCase() as QuerySortOperator,
                    },
                ];
            }
        }
    }

    return sortBy;
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
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const current = params.pagination?.current || 1;
        const pageSize = params.pagination?.pageSize || 10;

        const sortBy = generateSort(params.sort);

        const filters = generateFilter(params.filters);

        // search
        const searchFilter: CrudFilters = [];
        const { search } = params;
        if (search?.value && search.field) {
            searchFilter.push({
                field: search.field,
                operator: CondOperator.CONTAINS_LOW,
                value: search.value,
            });
        }

        const query = RequestQueryBuilder.create()
            .setFilter(filters)
            .setOr(searchFilter)
            .setLimit(pageSize)
            .setPage(current)
            .sortBy(sortBy)
            .setOffset((current - 1) * pageSize)
            .query();

        const { data } = await httpClient.get(`${url}?${query}`);

        return {
            data: data.data,
            total: data.total,
        };
    },

    getMany: async (resource, ids) => {
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

    create: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await httpClient.post(url, params);

        return {
            data,
        };
    },

    update: async (resource, id, params) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.patch(url, params);

        return {
            data,
        };
    },

    updateMany: async (resource, ids, params) => {
        const response = await Promise.all(
            ids.map(async (id) => {
                const { data } = await httpClient.patch(
                    `${apiUrl}/${resource}/${id}`,
                    params,
                );
                return data;
            }),
        );

        return { data: response };
    },

    createMany: async (resource, params) => {
        const url = `${apiUrl}/${resource}/bulk`;

        const { data } = await httpClient.post(url, { bulk: params });

        return {
            data,
        };
    },

    getOne: async (resource, id) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.get(url);

        return {
            data,
        };
    },

    deleteOne: async (resource, id) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url);

        return {
            data,
        };
    },

    deleteMany: async (resource, ids) => {
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

    custom: async (url, method, params = {}) => {
        const { filters, sort, payload, query } = params;

        const requestQueryBuilder = RequestQueryBuilder.create()
            .setFilter(generateFilter(filters))
            .sortBy(generateSort(sort))
            .query();

        let requestUrl = `${url}?${requestQueryBuilder}`;

        if (query) {
            requestUrl = `${requestUrl}&${stringify(query)}`;
        }

        let axiosResponse;
        switch (method) {
            case "put":
            case "post":
            case "patch":
                axiosResponse = await httpClient.post(url, payload);
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
