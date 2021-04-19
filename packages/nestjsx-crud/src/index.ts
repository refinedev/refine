import axios, { AxiosInstance } from "axios";
import {
    QueryFilter,
    QueryFilterArr,
    QuerySort,
    QuerySortArr,
    QuerySortOperator,
    RequestQueryBuilder,
    CondOperator,
} from "@nestjsx/crud-request";
import { DataProvider, HttpError } from "@pankod/refine";

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

const NestsxCrud = (
    apiUrl: string,
    httpClient: AxiosInstance = axiosInstance,
): DataProvider => ({
    getList: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const current = params.pagination?.current || 1;
        const pageSize = params.pagination?.pageSize || 10;

        const { sort } = params;

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

        // filters
        const crudFilters: CrudFilters = [];
        const { filters } = params;
        if (filters) {
            Object.keys(filters).map((field) => {
                if (filters[field]) {
                    crudFilters.push({
                        field,
                        operator: CondOperator.IN,
                        value: filters[field],
                    });
                }
            });
        }

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
            .setFilter(crudFilters)
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
});

export default NestsxCrud;
